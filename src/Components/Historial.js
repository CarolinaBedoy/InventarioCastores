import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Table, Button, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import NavBar from './NavBar';

function Historial() {
  const [movimientos, setMovimientos] = useState([]);
  const [filtroMovimiento, setFiltroMovimiento] = useState("todos"); // Filtro para tipo de movimiento (entrada, salida, todos)

  // Obtener los movimientos del historial
  useEffect(() => {
    axios.get("http://localhost:5000/api/movimientos")
      .then(response => setMovimientos(response.data))
      .catch(error => console.error("Error al obtener los movimientos:", error));
  }, []);

  // Filtrar los movimientos según el tipo de movimiento
  const movimientosFiltrados = filtroMovimiento === "todos" 
    ? movimientos 
    : movimientos.filter(mov => mov.tipoMovimiento === filtroMovimiento);

  return (
    <>
    <NavBar/>
      <Container className="mt-4">
        <Row className="mb-3 align-items-center">
          <Col>
            <h2>Historial de Movimientos</h2>
          </Col>
          <Col className="text-end">
            <Button variant="success" size="sm" onClick={() => setFiltroMovimiento("entrada")}>
              Filtrar Entrada
            </Button>
            <Button variant="danger" size="sm" className="ms-2" onClick={() => setFiltroMovimiento("salida")}>
              Filtrar Salida
            </Button>
            <Button variant="secondary" size="sm" className="ms-2" onClick={() => setFiltroMovimiento("todos")}>
              Ver Todos
            </Button>
          </Col>
        </Row>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID Usuario</th>
              <th>Tipo Movimiento</th>
              <th>ID Producto</th>
              <th>Cantidad</th>
              <th>Fecha y Hora</th>
            </tr>
          </thead>
          <tbody>
            {movimientosFiltrados.map((movimiento) => (
              <tr key={movimiento.idMovimiento}>
                <td>{movimiento.idUsuario}</td>
                <td>{movimiento.tipoMovimiento}</td>
                <td>{movimiento.idProducto}</td>
                <td>{movimiento.cantidad}</td>
                <td>{movimiento.fechaHora}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Historial;
