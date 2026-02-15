//Questa classe rappresenta la libreria di un utente
export class LibraryModel {
    constructor(books = []) {
        this.books = books;
    }

    //metodo per verificare se l'utente possiede un determinato libro
    hasBook(bookId) {
        return this.books.some(book => book.id === bookId);
    }
}