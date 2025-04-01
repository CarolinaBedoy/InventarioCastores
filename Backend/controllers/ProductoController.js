const db = require("../config/db");
const ProductoModel = require("../models/ProductoModel");

const ProductoController = {
  getAllProductos: (req, res) => {
    ProductoModel.getAllProductos((err, productos) => {
      if (err) {
        res.status(500).json({ error: "Error al obtener productos" });
      } else {
        res.json(productos);
      }
    });
  },

  actualizarCantidad: (req, res) => {
    const { idProducto } = req.params;
    const { cantidad } = req.body;

    ProductoModel.actualizarCantidad(idProducto, cantidad, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Error al actualizar la cantidad" });
      } else {
        res.json({ message: "Cantidad actualizada correctamente", result });
      }
    });
  },

  insertarProducto: (req, res) => {
    const { nombre, precio, estatus } = req.body;  // Recibimos nombre, precio y estatus

    if (!nombre || precio === undefined || estatus === undefined) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    // Insertamos el producto con nombre, precio y estatus
    db.query(
      "INSERT INTO productos (nombre, precio, estatus) VALUES (?, ?, ?)",  
      [nombre, precio, estatus],
      (error, results) => {
        if (error) return res.status(500).json({ error: "Error al insertar producto" });

        res.json({ 
          message: "Producto agregado correctamente", 
          id: results.insertId 
        });
      }
    );
  },

  cambiarEstado: (req, res) => {
    const { idProducto } = req.params;
    const { estatus } = req.body;

    if (estatus === undefined) {
      return res.status(400).json({ error: "El estado es requerido" });
    }

    ProductoModel.cambiarEstado(idProducto, estatus, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Error al cambiar el estado del producto" });
      } else {
        res.json({ message: "Estado del producto actualizado", result });
      }
    });
  },

  
};

module.exports = ProductoController;
