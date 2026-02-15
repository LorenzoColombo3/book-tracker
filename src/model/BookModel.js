import placeholderImg from '../img/placeholder_copertiva.png';

//Questa classe rappresenta il libro con tutti i suoi attributi 

export class BookModel {
    constructor(id, title, authors, thumbnail, description, isbn) {
        this.id = id;
        this.title = title;
        this.authors = authors;
        this.thumbnail = thumbnail;
        this.description = description;
        this.isbn = isbn;
    }

    //Metodo di parsing tra google api e BookModel
    static fromGoogleApi(item) {
        return new BookModel(
            item.id,
            item.volumeInfo?.title || 'Titolo non disponibile',
            item.volumeInfo?.authors?.join(', ') || 'Autore sconosciuto',
            item.volumeInfo?.imageLinks?.thumbnail || placeholderImg,
            item.volumeInfo?.description || 'Nessuna descrizione disponibile.',
            item.volumeInfo?.industryIdentifiers?.find(identifier => identifier.type === 'ISBN_13')?.identifier || 'Nessunp isbn',
        );
    }
}