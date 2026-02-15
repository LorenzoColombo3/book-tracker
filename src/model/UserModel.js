import { LibraryModel } from './LibraryModel';

export class UserModel {
    constructor(uid, email, library = new LibraryModel()) {
        this.uid = uid;
        this.email = email;
        this.library = library;
    }

    static fromFirebase(firebaseUser, libraryBooks = []) {
        if (!firebaseUser) return null;
        return new UserModel(
            firebaseUser.uid, 
            firebaseUser.email, 
            new LibraryModel(libraryBooks)
        );
    }
}