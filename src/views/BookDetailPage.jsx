import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert, Badge } from 'reactstrap';
import { BookDetailViewModel } from '../viewModel/BookDetailViewModel';
import { LibraryViewModel } from '../viewModel/LibraryViewModel';
import { AuthViewModel } from '../viewModel/AuthViewModel';
import '../styles/App.css';

const BookDetailPage = () => {
    const { id } = useParams();
    const { user, setUser } = AuthViewModel();
    const { book, loading } = BookDetailViewModel(id);
    const { addToLibrary, removeFromLibrary, feedback, isBookSaved } = LibraryViewModel(user, setUser);

    if (loading) return <div className="vh-100 d-flex justify-content-center align-items-center"><Spinner color="primary" /></div>;
    if (!book) return <Container className="mt-5"><Alert color="red">Libro non trovato</Alert></Container>;

    const saved = user ? isBookSaved(id) : false;

    return (
        <Container className="py-5">
            {feedback.visible && <Alert color={feedback.color} className="feedback-alert">{feedback.message}</Alert>}
            
            <Link to="/" className="text-decoration-none text-muted mb-4 d-inline-block fw-bold">◄ Torna alla ricerca</Link>

            <Row className="align-items-start g-5 mt-2">
                <Col lg={4} className="text-center">
                    <img src={book.thumbnail} alt={book.title} className="img-fluid rounded-4 shadow-lg w-100" style={{ maxWidth: '350px' }} />
                </Col>
                <Col lg={8}>
                    <div className="mb-4">
                        <h1 className="display-5 fw-bold mb-2">{book.title}</h1>
                        <h4 className="text-primary mb-3">{book.authors}</h4>
                        <h4 className="text-primary mb-3">ISBN: {book.isbn}</h4>
                        {saved && <Badge color="success" pill className="px-3 py-2">✓ Nella tua libreria</Badge>}
                    </div>
                    
                    {user && (
                        <div className="mb-5">
                            <Button 
                                color={saved ? "danger" : "primary"} 
                                size="lg" 
                                className="px-5 py-3 shadow"
                                onClick={() => saved ? removeFromLibrary(book.id) : addToLibrary(book)}
                            >
                                {saved ? "Rimuovi dalla collezione" : "Aggiungi alla collezione"}
                            </Button>
                        </div>
                    )}

                    <div className="bg-white p-4 rounded-4 shadow-sm">
                        <h5 className="fw-bold border-bottom pb-2 mb-3">Descrizione</h5>
                        <div 
                            className="text-muted description-content" 
                            style={{ lineHeight: '1.8' }}
                            dangerouslySetInnerHTML={{ __html: book.description }} 
                        />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default BookDetailPage;