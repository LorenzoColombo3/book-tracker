import React from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardImg, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import placeholderImg from '../img/placeholder_copertiva.png';

const BookGridView = ({ books, user, isBookSaved, addToLibrary, removeFromLibrary, saveScroll, lastBookElementRef }) => {
  return (
    <Row>
      {books.map((book, index) => {
        const saved = user ? isBookSaved(book.id) : false;
        const isLast = books.length === index + 1;
        
        return (
          <Col lg={3} md={4} sm={6} key={`${book.id}-${index}`} className="mb-4" ref={isLast ? lastBookElementRef : null}>
            <Card className="h-100 book-card shadow-sm border-0">
              <Link to={`/book/${book.id}`} onClick={saveScroll}>
                <CardImg 
                  top 
                  src={book.thumbnail} 
                  className="book-thumbnail" 
                  onError={(e) => { e.target.src = placeholderImg; }} 
                />
              </Link>
              <CardBody className="d-flex flex-column text-center">
                <CardTitle tag="h6" className="text-truncate mb-3 fw-bold">{book.title}</CardTitle>
                {user && (
                  <Button 
                    color={saved ? "danger" : "primary"} 
                    outline={!saved} 
                    size="sm" 
                    className="mt-auto rounded-pill py-2" 
                    onClick={() => saved ? removeFromLibrary(book.id) : addToLibrary(book)}
                  >
                    {saved ? "Rimuovi" : "Salva"}
                  </Button>
                )}
              </CardBody>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default BookGridView;