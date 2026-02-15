import React, { useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Alert, Card, CardBody } from 'reactstrap';
import { AuthViewModel } from '../viewModel/AuthViewModel';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = AuthViewModel();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError("Email o password non corretti");
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center bg-light">
      <Container style={{ maxWidth: '450px' }}>
        <Card className="border-0 shadow-lg p-4" style={{ borderRadius: '20px' }}>
          <CardBody>
            <div className="text-center mb-5">
                <h2 className="fw-bold">Bentornato</h2>
                <p className="text-muted">Accedi per gestire i tuoi libri</p>
            </div>
            {error && <Alert color="danger" className="rounded-3">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <FormGroup floating>
                <Input id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-light border-0" />
                <Label for="email">Indirizzo Email</Label>
              </FormGroup>
              <FormGroup floating>
                <Input id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-light border-0" />
                <Label for="password">Password</Label>
              </FormGroup>
              <Button color="primary" block size="lg" className="mt-4" type="submit">Accedi</Button>
            </Form>
            <p className="text-center mt-4 mb-0">Non hai un account? <Link to="/signup" className="text-primary fw-bold text-decoration-none">Iscriviti</Link></p>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default Login;