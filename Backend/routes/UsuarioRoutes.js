const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/UsuarioController");

router.get("/usuarios", UsuarioController.getAllUsuarios);

module.exports = router;
