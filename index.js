const models = require("./models");
require("dotenv").config();
const { User } = require("./models");
const express = require("express");
const app = express();
const APP_PORT = process.env.APP_PORT || 3000;
const routes = require("./routes/routes.js");
const session = require("express-session");
const { passport, passportConfig } = require("./config/passport");
const bcrypt = require("bcryptjs");
const makeUserAvailableInViews = require("./middleware/makeUserAvailableInViews");
const flash = require("connect-flash");
const mwFlash = require("./middleware/flash");

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
app.use(makeUserAvailableInViews);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(mwFlash);
app.use(function (req, res, next) {
  res.locals.login = req.isAuthenticated();
  next();
});
app.use(routes);
app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
