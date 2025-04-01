import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css';

import Login from './Components/Login';
import Inventario from './Components/Inventario';
import SalidaProductos from './Components/SalidaProductos';
import Historial from './Components/Historial';
import Inicio from './Components/Inicio';

const router = createBrowserRouter([
 {
    path: "/",
    element: <Login/>
  }, 
  {
    path: "/inventario",
    element: <Inventario/>
  },
  {
    path: "/salidaProductos",
    element: <SalidaProductos/>
  },
  {
    path: "/historial",
    element: <Historial/>
  },
  {
    path: "/inicio",
    element: <Inicio/>
  },
 
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<RouterProvider router={router}/> 
  </React.StrictMode>
);