const express = require("express");
const router = express.Router();
const ProductoController = require("../controllers/ProductoController");

router.get("/productos", ProductoController.getAllProductos);
router.put("/productos/:idProducto", ProductoController.actualizarCantidad);
router.post("/productos", ProductoController.insertarProducto);
router.put("/productos/:idProducto/estatus", ProductoController.cambiarEstado);

module.exports = router;
