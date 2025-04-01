const db = require("../config/db");
const UsuarioModel = require("../models/UsuarioModel");

const UsuarioController = {
  getAllUsuarios: (req, res) => {
    UsuarioModel.getAllUsuarios((err, usuarios) => {
      if (err) {
        res.status(500).json({ error: "Error al obtener usuarios" });
      } else {
        res.json(usuarios);
      }
    });
  },

  
};

module.exports = UsuarioController;
