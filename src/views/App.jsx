import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Navbar, NavbarBrand, Container, Nav, NavItem, NavLink, Button, Spinner } from 'reactstrap';
import { AuthViewModel } from '../viewModel/AuthViewModel';
import Home from './Home';
import Login from './LoginPage';
import SignUp from './SignUp';
import LibraryPage from './LibraryPage';
import BookDetailPage from './BookDetailPage';
import '../styles/App.css';

//Componente principale che definisce la struttura del layout con la Navbar e gestisce il routing dell'applicazione tramite HashRouter

function AppContent() {
  const { user, setUser, logout, loading } = AuthViewModel();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (loading) return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <Spinner color="primary" />
    </div>
  );

  return (
    <>
      <Navbar dark expand="md" fixed="top">
        <Container>
          <NavbarBrand tag={Link} to="/" className="fs-3 fw-bold text-white">
            📚 BookTracker
          </NavbarBrand>
          <Nav className="ms-auto align-items-center" navbar>
            {user ? (
              <>
                <NavItem><NavLink tag={Link} to="/library" className="text-white fw-bold mx-2">La mia Libreria</NavLink></NavItem>
                <NavItem>
                  <Button color="light" outline size="sm" className="rounded-pill px-3" onClick={handleLogout}>Esci</Button>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem><NavLink tag={Link} to="/login" className="text-white fw-bold mx-2">Accedi</NavLink></NavItem>
                <NavItem><Button tag={Link} to="/signup" color="light" className="rounded-pill px-4 text-primary fw-bold border-0">Iscriviti</Button></NavItem>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
      
      <div style={{ paddingTop: '80px' }}>
        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser} />} />
          <Route path="/library" element={<LibraryPage user={user} setUser={setUser} />} />
          <Route path="/book/:id" element={<BookDetailPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;