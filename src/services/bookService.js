import { BookModel } from '../model/BookModel';

const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

export const bookService = {
    searchBooks: async (query, searchType, startIndex = 0) => {
        const maxResults = 20;
        let refinedQuery = "";

        switch (searchType) {
            case 'title': refinedQuery = `intitle:${query}`; break;
            case 'author': refinedQuery = `inauthor:${query}`; break;
            case 'isbn': refinedQuery = `isbn:${query.replace(/-/g, "")}`; break;
            default: refinedQuery = `intitle:${query}`;
        }
        
        const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(refinedQuery)}&startIndex=${startIndex}&maxResults=${maxResults}&key=${API_KEY}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Errore nel caricamento dei dati');
            const data = await response.json();

            return {
                books: data.items ? data.items.map(item => BookModel.fromGoogleApi(item)) : [],
                totalItems: data.totalItems || 0
            };
        } catch (error) {
            console.error("Errore API:", error);
            throw error;
        }
    },

    getBookById: async (id) => {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`);
        if (!response.ok) throw new Error('Dettagli non trovati');
        const data = await response.json();
        return BookModel.fromGoogleApi(data);
    }
};