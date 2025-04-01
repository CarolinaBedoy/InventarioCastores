const db = require("../config/db");
const MovimientoModel = require("../models/MovimientoModel");

const MovimientoController = {
  getAllMovimientos: (req, res) => {
    MovimientoModel.getAllMovimientos((err, movimientos) => {
      if (err) {
        res.status(500).json({ error: "Error al obtener movimientos" });
      } else {
        res.json(movimientos);
      }
    });
  },

  insertarMovimiento: (req, res) => {
    const { idUsuario, tipoMovimiento, idProducto, cantidad, fechaHora } = req.body;  // Recibimos idUsuario, tipoMovimiento, idProducto, cantidad, fechaHora

    if (!idUsuario || 
      !tipoMovimiento || 
      !idProducto || 
      cantidad === undefined || 
      !fechaHora) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

    // Insertamos el producto con nombre, precio y estatus
    db.query(
      "INSERT INTO historial (idUsuario, tipoMovimiento, idProducto, cantidad, fechaHora) VALUES (?, ?, ?, ?, ?)",  
      [idUsuario, tipoMovimiento, idProducto, cantidad, fechaHora],
      (error, results) => {
        if (error) return res.status(500).json({ error: "Error al insertar movimiento" });

        res.json({ 
          message: "Movimiento agregado correctamente", 
        });
      }
    );
  },

  

 

  
};

module.exports = MovimientoController;
