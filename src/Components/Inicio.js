import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import NavBar from './NavBar';
import { Container, Row, Col } from 'react-bootstrap';

function BasicExample() {
  return (
    <>
      <NavBar />
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Row className="justify-content-center">
          <Col md="auto">
            <Card style={{ width: '18rem' }}>
              <Card.Img
                variant="top"
                src="https://th.bing.com/th/id/OIP.HMdM_wydWHwpY4ykP8r8pgAAAA?w=400&h=400&rs=1&pid=ImgDetMain"
              />
              <Card.Body>
                <Card.Title>Grupo Castores</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default BasicExample;
