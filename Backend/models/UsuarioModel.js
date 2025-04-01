const db = require("../config/db");

const UsuarioModel = {
  getAllUsuarios: (callback) => {
    db.query("SELECT * FROM usuarios", (err, results) => {
      if (err) callback(err, null);
      else callback(null, results);
    });
  },
  
};

module.exports = UsuarioModel;
