import { LibraryModel } from './LibraryModel';

//questa classe rappresenta l'utente autenticato con userID, email e la sua libreria

export class UserModel {
    constructor(uid, email, library = new LibraryModel()) {
        this.uid = uid;
        this.email = email;
        this.library = library;
    }

    //metodo che da firebase ricostruisce l'utente e recupera i suoi libri
    static fromFirebase(firebaseUser, libraryBooks = []) {
        if (!firebaseUser) return null;
        return new UserModel(
            firebaseUser.uid, 
            firebaseUser.email, 
            new LibraryModel(libraryBooks)
        );
    }
}