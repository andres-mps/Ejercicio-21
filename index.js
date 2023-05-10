const models = require("./models");
require("dotenv").config();

const express = require("express");
const app = express();
const APP_PORT = process.env.APP_PORT || 3000;
const routes = require("./routes/routes.js");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(routes);

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
