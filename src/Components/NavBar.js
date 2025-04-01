import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom"; // Importa useLocation

function NavBar() {
  const location = useLocation(); // Usamos el hook useLocation para obtener la ruta actual
  const idUsuario = parseInt(localStorage.getItem("user")); // Obtener el idUsuario desde localStorage
  const nombreUsuario = localStorage.getItem("nombreUser"); // Obtener el nombreUsuario desde localStorage
  const rolUsuario = parseInt(localStorage.getItem("rolUser")); // Obtener el rol desde localStorage

  const handleCerrarSesion = () => {
    // Eliminar el usuario del localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("nombreUser");
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/inicio">Inventario Castores</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link
            as={Link}
            to="/inventario"
            active={location.pathname === "/inventario"} // Resalta si estamos en inventario
          >
            Inventario
          </Nav.Link>

          <Nav.Link
            as={Link}
            to="/salidaProductos"
            active={location.pathname === "/salidaProductos"} // Resalta si estamos en salida de productos
            style={idUsuario === 1 ? { display: 'none'} : {}} // Cambia lo visible
          >
            Salida de productos
          </Nav.Link>

          <Nav.Link
            as={Link}
            to="/historial"
            active={location.pathname === "/historial"} // Resalta si estamos en historial
            style={idUsuario === 2 ? { display: 'none'} : {}} // Cambia lo visible
          >
            Histórico
          </Nav.Link>

          <Nav.Link
            as={Link}
            to="/"
            onClick={handleCerrarSesion}
            active={location.pathname === "/"} // Resalta si estamos en log out
          >
            Cerrar sesión &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Nav.Link>
          
           {/* Mostrar el nombre del usuario */}
           {nombreUsuario && (
            <Nav.Link
              style={{ color: 'white', cursor: 'default', padding: '10px 15px' }}
            >
              {nombreUsuario} - {rolUsuario === 1 ? "Administrador" : "Almacenista"}

            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
