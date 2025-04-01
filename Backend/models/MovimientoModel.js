const db = require("../config/db");

const MovimientoModel = {
  getAllMovimientos: (callback) => {
    db.query("SELECT * FROM historial", (err, results) => {
      if (err) callback(err, null);
      else callback(null, results);
    });
  },


};

module.exports = MovimientoModel;
