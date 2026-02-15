import { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, onSnapshot } from "firebase/firestore";
import { libraryService } from '../services/libraryService';
import { LibraryModel } from '../model/LibraryModel';

/**
 * Gestisce le interazioni tra l'utente e la sua libreria, permettendo di aggiungere/rimuovere 
 * libri e fornendo feedback visivi sulle operazioni effettuate
 */

export function LibraryViewModel(user, setUser) {
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState({ visible: false, message: '', color: '' });

    //Sincronizza in tempo reale la libreria dell'utente con il firestore datastore
    useEffect(() => {
        if (!user?.uid || !setUser) return;

        const userBooksRef = collection(db, "users", user.uid, "books");
        
        const unsubscribe = onSnapshot(userBooksRef, (snapshot) => {
            const books = snapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id }));
            setUser(prev => ({
                ...prev,
                library: new LibraryModel(books)
            }));
        });

        return () => unsubscribe();
    }, [user?.uid, setUser]);

    const showFeedback = ((message, color) => {
        setFeedback({ visible: true, message, color });
        setTimeout(() => setFeedback({ visible: false, message: '', color: '' }), 3000);
    }, []);

    //Metodo per il caricamento della collezione di libri dal database
    const loadLibrary = (async () => {
        if (!user?.uid || !setUser) return;
        setLoading(true);
        try {
            const books = await libraryService.getUserLibrary(user.uid); 
            setUser(prev => ({
                ...prev,
                library: new LibraryModel(books)
            }));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [user?.uid, setUser]);

    //Gestisce l'aggiunta di un nuovo libro alla collezione dell'utente fornendo un feedback sull'esito dell'operazione
    const addToLibrary = async (book) => {
        if (!user) return;
        try {
            const result = await libraryService.addBook(user.uid, book);
            if (result.status === 'success') {
                showFeedback(result.message, "success");
            } else {
                showFeedback(result.message, "warning");
            }
        } catch (err) {
            showFeedback("Errore durante il salvataggio", "danger");
        }
    };

    //Rimuove un libro specifico dalla libreria mostrando un feedback visivo
    const removeFromLibrary = async (bookId) => {
        if (!user) return;
        try {
            await libraryService.removeBook(user.uid, bookId);
            showFeedback("Libro rimosso", "info");
        } catch (err) {
            showFeedback("Errore durante la rimozione", "danger");
        }
    };

    return { 
        libraryBooks: user?.library?.books || [], 
        loading, 
        addToLibrary, 
        removeFromLibrary, 
        loadLibrary,
        feedback,
        //Verifica se un determinato libro fa già parte della collezione dell'utente
        isBookSaved: (id) => user?.library?.hasBook(id) || false
    };
}