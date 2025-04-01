const db = require("../config/db");

const ProductoModel = {
  getAllProductos: (callback) => {
    db.query("SELECT * FROM productos", (err, results) => {
      if (err) callback(err, null);
      else callback(null, results);
    });
  },

  actualizarCantidad: (idProducto, cantidad, callback) => {
    db.query(
      "UPDATE productos SET cantidad = ? WHERE idProducto = ?",
      [cantidad, idProducto],
      (err, results) => {
        if (err) callback(err, null);
        else callback(null, results);
      }
    );
  },

  cambiarEstado: (idProducto, estado, callback) => {
    db.query(
      "UPDATE productos SET estatus = ? WHERE idProducto = ?",
      [estado, idProducto],
      (err, results) => {
        if (err) callback(err, null);
        else callback(null, results);
      }
    );
  },

};

module.exports = ProductoModel;
