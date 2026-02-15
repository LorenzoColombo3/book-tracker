import React from 'react';
import { Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import placeholderImg from '../img/placeholder_copertiva.png';

//Componente per la visualizzazione dei libri in un layout in stile lista

const BookListView = ({ books, user, isBookSaved, addToLibrary, removeFromLibrary, lastBookElementRef }) => {
  return (
    <div className="flex-column">
      {books.map((book, index) => {
        const saved = user ? isBookSaved(book.id) : false;
        const isLast = books.length === index + 1;
        
        return (
          <Col xs={12} key={`${book.id}-${index}`} className="mb-3" ref={isLast ? lastBookElementRef : null}>
            <div className="book-list-item shadow-sm">
              <Link to={`/book/${book.id}`}>
                <img 
                  src={book.thumbnail} 
                  className="list-thumbnail me-4" 
                  alt={book.title} 
                  onError={(e) => { e.target.src = placeholderImg; }} 
                />
              </Link>
              <div className="flex-grow-1">
                <Link to={`/book/${book.id}`} className="text-decoration-none text-dark">
                  <h5 className="mb-1 fw-bold text-truncate" style={{maxWidth: '400px'}}>{book.title}</h5>
                </Link>
                <p className="text-muted mb-0">{book.authors}</p>
              </div>
              {user && (
                <div className="ms-3">
                  <Button 
                    color={saved ? "danger" : "primary"} 
                    outline={!saved} 
                    className="rounded-pill px-4"
                    onClick={() => saved ? removeFromLibrary(book.id) : addToLibrary(book)}
                  >
                    {saved ? "Rimuovi" : "Salva"}
                  </Button>
                </div>
              )}
            </div>
          </Col>
        );
      })}
    </div>
  );
};

export default BookListView;