import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Para redirigir al usuario

function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para redirigir

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!correo || !contrasena) {
      setError('Por favor ingresa tu correo y contraseña');
      return;
    }

    try {
      // Hacemos la solicitud a la API para obtener los usuarios
      const response = await axios.get('http://localhost:5000/api/usuarios');

      // Verificamos si encontramos el usuario con el correo y la contraseña
      const usuario = response.data.find(
        (user) => user.correo === correo && user.contrasena === contrasena && user.estatus === 1
      );

      if (!usuario) {
        setError('Usuario no encontrado o contraseña incorrecta');
        return;
      }

      // Si el usuario es encontrado y es activo, redirigimos a la página de inventario
      // Almacenamos el ID del usuario en el localStorage o contexto
      localStorage.setItem('user', (usuario.idUsuario));
      localStorage.setItem('nombreUser', (usuario.nombre));
      localStorage.setItem('rolUser', (usuario.idRol));

      // Redirigimos al usuario a la página de inventario
      navigate('/inventario');
    } catch (error) {
      setError('Hubo un error al intentar iniciar sesión. Intenta nuevamente.');
      console.error('Error de autenticación:', error);
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={4} className="bg-white p-4 rounded shadow-sm border border-light">
          <h2 className="text-center text-dark mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Login</h2>
          
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email" 
                className="border-secondary"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)} 
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Password" 
                className="border-secondary"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)} 
                required
              />
            </Form.Group>

            {error && <p className="text-danger">{error}</p>} {/* Mostrar error si es necesario */}

            <Button variant="danger" type="submit" className="w-100 py-2">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;

