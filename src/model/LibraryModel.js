export class LibraryModel {
    constructor(books = []) {
        this.books = books;
    }

    hasBook(bookId) {
        return this.books.some(book => book.id === bookId);
    }
}