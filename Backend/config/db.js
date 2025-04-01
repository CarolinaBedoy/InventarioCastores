const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", 
  database: "inventariocastores",
});

db.connect((err) => {
  if (err) {
    console.error("Error de conexión a MySQL:", err);
    return;
  }
  console.log("Conectado a la base de datos MySQL");
});

module.exports = db;
