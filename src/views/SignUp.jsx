import React, { useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Alert, Card, CardBody } from 'reactstrap';
import { AuthViewModel } from '../viewModel/AuthViewModel';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signUp } = AuthViewModel();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate('/');
    } catch (err) {
      setError("Errore durante la creazione dell'account");
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center bg-light">
      <Container style={{ maxWidth: '450px' }}>
        <Card className="border-0 shadow-lg p-4" style={{ borderRadius: '20px' }}>
          <CardBody>
            <h2 className="text-center fw-bold mb-4">Inizia ora</h2>
            {error && <Alert color="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <FormGroup floating>
                <Input id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-light border-0" />
                <Label for="email">Email</Label>
              </FormGroup>
              <FormGroup floating>
                <Input id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-light border-0" />
                <Label for="password">Password</Label>
              </FormGroup>
              <Button color="primary" block size="lg" className="mt-4" type="submit">Crea Account</Button>
            </Form>
            <p className="text-center mt-4">Hai già un account? <Link to="/login" className="text-decoration-none fw-bold">Accedi</Link></p>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default SignUp;