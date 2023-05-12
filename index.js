require("dotenv").config();

const express = require("express");
const app = express();
const APP_PORT = process.env.APP_PORT || 3000;
const routes = require("./routes/routes.js");
const session = require("express-session");
const { passport, passportConfig } = require("./config/passport");

const makeUserAvailableInViews = require("./middleware/makeUserAvailableInViews");
const flash = require("connect-flash");
const mwFlash = require("./middleware/flash");
const isAuthenticated = require("./middleware/isAuthenticated");

app.use(
  session({
    secret: "milanesa",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

app.use(passport.session());
passportConfig();
app.use(makeUserAvailableInViews); // disponibiliza info de req.user a res.local.user

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(mwFlash); // para mostrar mensajes de FLASH en login
app.use(isAuthenticated); // para chequear si usuario está logueado y disponibilizar conetnido.
app.use(routes);

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
