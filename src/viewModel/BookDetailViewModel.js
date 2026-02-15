import { useState, useEffect } from 'react';
import { bookService } from '../services/bookService';

//Gestisce il caricamento asincrono dei dettagli di un singolo libro tremite ID

export function BookDetailViewModel(id) {
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    //Recupera in modo asincrono i dati completi di un libro non appena il componente viene montato
    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const data = await bookService.getBookById(id);
                setBook(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchDetail();
    }, [id]);

    return { book, loading };
}