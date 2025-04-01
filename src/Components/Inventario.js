import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Table, Button, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import NavBar from './NavBar';


function Inventario() {
  const [productos, setProductos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nombreProducto, setNombreProducto] = useState("");
  const [precioProducto, setPrecioProducto] = useState("");
  const [filtroEstatus, setFiltroEstatus] = useState(null); // Para filtrar los productos
  const idUsuario = parseInt(localStorage.getItem("user")); 

  useEffect(() => {
    axios.get("http://localhost:5000/api/productos")
      .then(response => setProductos(response.data))
      .catch(error => console.error("Error al obtener datos:", error));
  }, []);

  const filtrarProductos = (estatus) => {
    setFiltroEstatus(estatus); // Establece el filtro de estado
  };

  // Mostrar todos los productos cuando no hay filtro
  const productosFiltrados = filtroEstatus === null ? productos : productos.filter(p => p.estatus === filtroEstatus);

  const [cantidadIncrementar, setCantidadIncrementar] = useState({});

  const incrementarCantidad = (idProducto, cantidadActual) => {
    const cantidad = parseInt(cantidadIncrementar[idProducto], 10) || 0;
    if (cantidad <= 0) {
      alert("Ingresa una cantidad válida.");
      return;
    }

    const nuevaCantidad = cantidadActual + cantidad;
    const fechaHora = new Date().toISOString().slice(0, 19).replace("T", " ");

    axios.put(`http://localhost:5000/api/productos/${idProducto}`, { cantidad: nuevaCantidad })
      .then(() => {
        setProductos(prevProductos =>
          prevProductos.map(producto =>
            producto.idProducto === idProducto
              ? { ...producto, cantidad: nuevaCantidad }
              : producto
          )
        );
        setCantidadIncrementar(prev => ({ ...prev, [idProducto]: "" }));

        // Registrar el movimiento en historial
        console.log({
          idUsuario: idUsuario,
          tipoMovimiento: "entrada",
          idProducto: idProducto,
          cantidad: cantidad,
          fechaHora: fechaHora
        });
        
        axios.post("http://localhost:5000/api/movimientos", {
          idUsuario: idUsuario,
          tipoMovimiento: "entrada",
          idProducto: idProducto,
          cantidad: cantidad,
          fechaHora: fechaHora
        })
        .catch(error => console.error("Error al registrar movimiento:", error));
      })
      .catch(error => console.error("Error al actualizar la cantidad:", error));
  };

  const cambiarEstado = (idProducto, estadoActual) => {
    const nuevoEstado = estadoActual === 1 ? 0 : 1;
    axios.put(`http://localhost:5000/api/productos/${idProducto}/estatus`, { estatus: nuevoEstado })
      .then(() => {
        setProductos(prevProductos =>
          prevProductos.map(producto =>
            producto.idProducto === idProducto
              ? { ...producto, estatus: nuevoEstado }
              : producto
          )
        );
      })
      .catch(error => console.error("Error al cambiar estado:", error));
  };

  const agregarProducto = () => {
    if (!nombreProducto || !precioProducto) {
      alert("Por favor, ingresa el nombre y precio del producto.");
      return;
    }

    axios.post("http://localhost:5000/api/productos", { 
      nombre: nombreProducto, 
      precio: precioProducto, 
      estatus: 1 
    })
    .then(response => {
      alert("Producto agregado correctamente");
      setMostrarFormulario(false);
      setNombreProducto("");
      setPrecioProducto("");

      setProductos(prevProductos => [
        ...prevProductos, 
        { idProducto: response.data.id, nombre: nombreProducto, precio: precioProducto, cantidad: 0, estatus: 1 }
      ]);
    })
    .catch(error => console.error("Error al agregar el producto:", error));
  };

  return (
    <>
      <NavBar/>

      <Container className="mt-4">
        <Row className="mb-3 align-items-center">
          <Col>
            <h2>{filtroEstatus === 1 ? "Productos Activos" : filtroEstatus === 0 ? "Productos Inactivos" : "Lista de Productos"}</h2>
          </Col>
          <Col className="text-end">
            <Button variant="primary" size="sm" onClick={() => setMostrarFormulario(!mostrarFormulario)}
            style={idUsuario === 2 ? { display: 'none'} : {}} // Cambia lo visible  
            >
              {mostrarFormulario ? "Cancelar" : "Agregar Nuevo Producto"}
            </Button>
            <Button variant="success" size="sm" className="ms-2" onClick={() => filtrarProductos(1)}>
              Productos Activos
            </Button>
            <Button variant="danger" size="sm" className="ms-2" onClick={() => filtrarProductos(0)}>
              Productos Inactivos
            </Button>
            <Button variant="secondary" size="sm" className="ms-2" onClick={() => filtrarProductos(null)}>
              Ver Todo
            </Button>
          </Col>
        </Row>

        {mostrarFormulario && (
          <Row className="mb-4 align-items-center">
            <Col md={3}>
              <Form.Control
                type="text"
                placeholder="Nombre del Producto"
                value={nombreProducto}
                onChange={(e) => setNombreProducto(e.target.value)}
                required
              />
            </Col>
            <Col md={3}>
              <Form.Control
                type="number"
                placeholder="Precio del Producto"
                value={precioProducto}
                onChange={(e) => setPrecioProducto(e.target.value)}
                required
              />
            </Col>
            <Col md="auto">
              <Button variant="primary" size="sm" onClick={agregarProducto}
              style={idUsuario === 2 ? { display: 'none'} : {}} // Cambia lo visible
              >
                Agregar Producto
              </Button>
            </Col>
          </Row>
        )}

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              {/* Solo mostrar columna de acciones si no hay filtro activo */}
              {filtroEstatus === null && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((producto) => (
              <tr key={producto.idProducto} style={{ backgroundColor: producto.estatus === 0 ? "#f8d7da" : "white" }}>
                <td>{producto.idProducto}</td>
                <td>{producto.nombre}</td>
                <td>{producto.precio}</td>
                <td>{producto.cantidad}</td>
                {/* Solo mostrar la columna de acciones si no hay filtro activo */}
                {filtroEstatus === null && (
                  <td>
                    <Form.Control
                      type="number"
                      placeholder="Cantidad"
                      value={cantidadIncrementar[producto.idProducto] || ""}
                      onChange={(e) =>
                        setCantidadIncrementar({
                          ...cantidadIncrementar,
                          [producto.idProducto]: e.target.value,
                        })
                      }
                      style={idUsuario === 2 ? { display: 'none'} : {width: "100px", display: "inline-block", marginRight: "10px"}} // Cambia lo visible
                    />
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => incrementarCantidad(producto.idProducto, producto.cantidad)}
                      style={idUsuario === 2 ? { display: 'none'} : {}} // Cambia lo visible
                    >
                      Incrementar
                    </Button>&nbsp;&nbsp;&nbsp;
                    <Button
                      variant={producto.estatus === 1 ? "danger" : "primary"}
                      size="sm"
                      onClick={() => cambiarEstado(producto.idProducto, producto.estatus)}
                      style={idUsuario === 2 ? { display: 'none'} : {}} // Cambia lo visible
                    >
                      {producto.estatus === 1 ? "Dar de Baja" : "Reactivar"}
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Inventario;
