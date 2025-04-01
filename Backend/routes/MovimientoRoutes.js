const express = require("express");
const router = express.Router();
const MovimientoController = require("../controllers/MovimientoController");

router.get("/movimientos", MovimientoController.getAllMovimientos);
router.post("/movimientos", MovimientoController.insertarMovimiento);

module.exports = router;
