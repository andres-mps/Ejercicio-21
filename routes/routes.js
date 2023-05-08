const express = require("express");
const routes = express.Router();
const homeController = require("../controllers/homeController");
const adminController = require("../controllers/adminController");
const articleController = require("../controllers/articleController");

routes.get("/", homeController.viewHome);

routes.get("/admin", adminController.viewAdmin);

routes.get("/article", articleController.viewArticle);

routes.post("/addComment", articleController.addComment);

module.exports = routes;
