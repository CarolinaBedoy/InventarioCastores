import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Table, Button, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import NavBar from './NavBar';

function Inventario() {
  const [productos, setProductos] = useState([]);
  const [cantidadReducir, setCantidadReducir] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/productos")
      .then(response => setProductos(response.data.filter(p => p.estatus === 1)))
      .catch(error => console.error("Error al obtener datos:", error));
  }, []);

  const reducirCantidad = (idProducto, cantidadActual) => {
    const cantidad = cantidadReducir[idProducto] || 0;
    const idUsuario = parseInt(localStorage.getItem("user")); 
    const fechaHora = new Date().toISOString().slice(0, 19).replace("T", " ");

    if (cantidad <= 0) {
      alert("Ingresa una cantidad válida.");
      return;
    }
    
    if (cantidad > cantidadActual) {
      alert("Error: La cantidad ingresada supera la existencia actual.");
      return;
    }

    const nuevaCantidad = cantidadActual - cantidad;

    axios.put(`http://localhost:5000/api/productos/${idProducto}`, { cantidad: nuevaCantidad })
      .then(() => {
        setProductos(prevProductos =>
          prevProductos.map(producto =>
            producto.idProducto === idProducto
              ? { ...producto, cantidad: nuevaCantidad }
              : producto
          )
        );
        setCantidadReducir(prev => ({ ...prev, [idProducto]: "" }));

        
        axios.post("http://localhost:5000/api/movimientos", {
          idUsuario: idUsuario,
          tipoMovimiento: "salida",
          idProducto: idProducto,
          cantidad: cantidad,
          fechaHora: fechaHora
        })
        .catch(error => console.error("Error al registrar movimiento:", error));
      })
      .catch(error => console.error("Error al actualizar la cantidad:", error));
  };

  return (
    <>
      <NavBar/>

      <Container className="mt-4">
        <Row className="mb-3 align-items-center">
          <Col>
            <h2>Lista de Productos</h2>
          </Col>
        </Row>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.idProducto}>
                <td>{producto.idProducto}</td>
                <td>{producto.nombre}</td>
                <td>{producto.precio}</td>
                <td>{producto.cantidad}</td>
                <td>
                  <Form.Control
                    type="number"
                    placeholder="Cantidad"
                    value={cantidadReducir[producto.idProducto] || ""}
                    onChange={(e) =>
                      setCantidadReducir({
                        ...cantidadReducir,
                        [producto.idProducto]: e.target.value,
                      })
                    }
                    style={{ width: "100px", display: "inline-block", marginRight: "10px" }}
                  />
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => reducirCantidad(producto.idProducto, producto.cantidad)}
                  >
                    Reducir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Inventario;
