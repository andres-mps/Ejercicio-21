const express = require("express");
const routes = express.Router();
const mainController = require("../controllers/mainControllers.js");

routes.get("/", (req, res) => {
  res.render("home");
});

module.exports = routes;
