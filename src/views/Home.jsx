import React, { useState, useRef, useCallback, useEffect } from 'react';
import { 
  Container, Form, FormGroup, Input, Button, Spinner, Alert, 
  InputGroup, Dropdown, DropdownToggle, DropdownMenu, DropdownItem 
} from 'reactstrap';
import { BookViewModel } from '../viewModel/BookViewModel';
import { LibraryViewModel } from '../viewModel/LibraryViewModel';
import BookGridView from './BookGridView';
import BookListView from './BookListView';
import ViewModeToggle from './ViewModeToggle';
import '../styles/App.css';

const Home = ({ user, setUser }) => {
  const { books, searching, search, loadMore, hasMore, error, lastQuery } = BookViewModel();
  const { addToLibrary, removeFromLibrary, feedback, isBookSaved } = LibraryViewModel(user, setUser);
  
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [viewMode, setViewMode] = useState('grid');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const observer = useRef();
  const lastBookElementRef = useCallback(node => {
    if (searching) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    if (node) observer.current.observe(node);
  }, [searching, hasMore, loadMore]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      search(query, searchType, 1);
    }
  };

  const getDropdownLabel = () => {
    switch(searchType) {
      case 'title': return 'Titolo';
      case 'author': return 'Autore';
      case 'isbn': return 'ISBN';
      default: return 'Filtra';
    }
  };

  const commonProps = { books, user, isBookSaved, addToLibrary, removeFromLibrary, saveScroll: () => {}, lastBookElementRef };

  return (
    <div className="pb-5">
      {(feedback.visible || error) && (
        <Alert color={error ? "warning" : feedback.color} className="feedback-alert">
          {error || feedback.message}
        </Alert>
      )}

      <div className="hero-gradient"></div>
      
      <Container>
        <div className="search-container mb-4 shadow-lg">
          <h2 className="text-center mb-4 fw-bold">Esplora la Biblioteca</h2>
          <Form onSubmit={handleSearch}>
            <InputGroup size="lg" className="custom-search-group shadow-sm">
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle caret color="white" className="h-100 px-4 text-primary fw-bold border-0">
                  {getDropdownLabel()}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => setSearchType('title')}>Titolo</DropdownItem>
                  <DropdownItem onClick={() => setSearchType('author')}>Autore</DropdownItem>
                  <DropdownItem onClick={() => setSearchType('isbn')}>ISBN</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              
              <Input 
                className="border-0 px-4" 
                placeholder="Cerca un libro..." 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
              />
              
              <Button color="primary" className="px-5 fw-bold" type="submit" disabled={searching}>
                {searching && books.length === 0 ? <Spinner size="sm" /> : 'Cerca'}
              </Button>
            </InputGroup>
          </Form>
        </div>

        {books.length > 0 && <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />}

        <div className="min-vh-50">
            {!searching && books.length === 0 && !error && lastQuery === '' && (
              <div className="text-center py-5">
                <h1 className="fw-bold">Inizia una ricerca per visualizzare i libri</h1>
              </div>
            )}

            {!searching && books.length === 0 && !error && lastQuery !== '' && (
              <div className="container-fluid p-5 text-black text-center">
                <h1 className="fw-bold">Nessun elemento trovato per questa ricerca</h1>
              </div>
            )}

            {books.length > 0 && (
              viewMode === 'grid' ? (
                <BookGridView {...commonProps} />
              ) : (
                <BookListView {...commonProps} />
              )
            )}

            {searching && <div className="text-center py-4"><Spinner color="primary" /></div>}
        </div>
      </Container>

      <Button 
        color="primary" 
        className={`back-to-top ${showBackToTop ? 'show' : ''}`} 
        onClick={scrollToTop}
      >
        ▲
      </Button>
    </div>
  );
};

export default Home;