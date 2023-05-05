const express = require("express");
const routes = express.Router();
const mainController = require("../controllers/mainControllers.js");

//routes.get("/", mainController.viewHome);

routes.get("/admin", mainController.viewAdmin);

routes.get("/article", mainController.viewArticle);

module.exports = routes;
