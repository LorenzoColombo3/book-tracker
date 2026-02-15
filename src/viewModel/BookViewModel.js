import { bookService } from '../services/bookService';
import { useState } from 'react';

/**
 * Gestisce la logica della ricerca dei libri, mantenendo lo stato dei risultati, degli errori 
 * e caricando nuove pagine di risultati per lo scroll fino ad esaurimento risulati
 */

export function BookViewModel() {
    const [books, setBooks] = useState([]);
    const [searching, setSearching] = useState(false);
    const [error, setError] = useState(null);
    const [lastQuery, setLastQuery] = useState('');
    const [lastType, setLastType] = useState('title');
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    //Esegue la chiamata al servizio di ricerca, gestendo lo stato del caricamento e l'impaginazione dei risultati
    const search = async (query, searchType = 'title', page = 1) => {
        if (!query.trim()) return;
        
        setSearching(true);
        setError(null);
        const maxResults = 20;
        const startIndex = (page - 1) * maxResults;
        
        try {
            const result = await bookService.searchBooks(query, searchType, startIndex);
            const newBooks = page === 1 ? result.books : [...books, ...result.books];
            
            setBooks(newBooks);
            setLastQuery(query);
            setLastType(searchType);
            setCurrentPage(page);
            setHasMore(result.books.length === maxResults);
        } catch (err) {
            setError("Errore nella ricerca.");
        } finally {
            setSearching(false);
        }
    };
    //Metodo dedicato al caricamento della pagina successiva di risultati per implementare lo scroll sino ad esaurimento dei risultati
    const loadMore = () => {
        if (!searching && hasMore) search(lastQuery, lastType, currentPage + 1);
    };

    return { books, searching, search, loadMore, hasMore, error, lastQuery, lastType };
}