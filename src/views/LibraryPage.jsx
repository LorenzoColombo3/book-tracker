import React, { useState } from 'react';
import { Container, Spinner, Alert, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LibraryViewModel } from '../viewModel/LibraryViewModel';
import BookGridView from './BookGridView';
import BookListView from './BookListView';
import ViewModeToggle from './ViewModeToggle';
import '../styles/App.css';

//Visualizza la collezione personale dei libri dell'utente autenticato, permettendone la gestione

const LibraryPage = ({ user, setUser }) => {
    const { libraryBooks, loading, removeFromLibrary, feedback, isBookSaved, addToLibrary, loadLibrary } = LibraryViewModel(user, setUser);
    const [viewMode, setViewMode] = useState('grid');

    const commonProps = {
        books: libraryBooks,
        user,
        isBookSaved,
        addToLibrary,
        removeFromLibrary,
        saveScroll: () => {},
        lastBookElementRef: null 
    };

    return (
        <Container className="py-5">
            {!user ? (
                <h1 className="fw-bold m-0 me-3">Non hai effettuato l'accesso, accedi o iscriviti per visualizzare i tuoi libri.</h1>
            ) : (
                <>
                    {feedback.visible && <Alert color={feedback.color} className="feedback-alert">{feedback.message}</Alert>}
                
                    <div className="d-flex justify-content-between align-items-center mb-5">
                        <div className="d-flex align-items-center">
                            <h1 className="fw-bold m-0 me-3">La mia Libreria 📚</h1>
                            <Button 
                                color="primary" 
                                outline 
                                size="sm" 
                                className="rounded-circle p-2 shadow-sm d-flex align-items-center justify-content-center"
                                style={{ width: '40px', height: '40px' }}
                                onClick={loadLibrary}
                                disabled={loading}
                            >
                                {loading ? <Spinner size="sm" /> : "↻"}
                            </Button>
                        </div>
                        {libraryBooks.length > 0 && <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />}
                    </div>

                    {loading && libraryBooks.length === 0 ? (
                        <div className="text-center py-5"><Spinner color="primary" /></div>
                    ) : libraryBooks.length === 0 ? (
                        <div className="text-center py-5">
                            <p className="lead text-muted">La tua libreria è ancora vuota.</p>
                            <Button tag={Link} to="/" color="primary" size="lg" className="rounded-pill px-4">Esplora i libri</Button>
                        </div>
                    ) : (
                        <div className="min-vh-50">
                            {viewMode === 'grid' ? <BookGridView {...commonProps} /> : <BookListView {...commonProps} />}
                        </div>
                    )}
                </>
            )}
        </Container>
    );
};

export default LibraryPage;