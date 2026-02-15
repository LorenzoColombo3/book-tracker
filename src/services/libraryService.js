import { db } from './firebase';
import { collection, getDoc, setDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

export const libraryService = {

    //Salva i dati di un libro nel database Firestore all'interno della collezione specifica dell'utente
    addBook: async (userId, book) => {
        const bookRef = doc(db, "users", userId, "books", book.id);
        const docSnap = await getDoc(bookRef);

        if (docSnap.exists()) {
            return { status: 'exists', message: "Libro già presente nella libreria" };
        }

        await setDoc(bookRef, {
            id: book.id,
            title: book.title,
            authors: book.authors,
            thumbnail: book.thumbnail,
            description: book.description,
            addedAt: new Date()
        });
        return { status: 'success', message: "Libro aggiunto con successo" };
    },

    //Recupera tutti i libri salvati da un utente dal database Firestore
    getUserLibrary: async (userId) => {
        const userBooksRef = collection(db, "users", userId, "books");
        const querySnapshot = await getDocs(userBooksRef);
        return querySnapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id }));
    },

    //Elimina definitivamente un libro dalla collezione Firestore dell'utente
    removeBook: async (userId, bookId) => {
        await deleteDoc(doc(db, "users", userId, "books", bookId));
    }
};