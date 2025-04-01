const express = require("express");
const cors = require("cors");
const productoRoutes = require("./routes/ProductoRoutes");
const usuarioRoutes = require("./routes/UsuarioRoutes");
const movimientoRoutes = require("./routes/MovimientoRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", productoRoutes);
app.use("/api", usuarioRoutes);
app.use("/api", movimientoRoutes);

app.listen(5000, () => {
  console.log("Servidor corriendo en http://localhost:5000");
});
