const express = require("express");
const routes = express.Router();
const homeController = require("../controllers/homeController");
const adminController = require("../controllers/adminController");
const articleController = require("../controllers/articleController");

routes.get("/", homeController.viewHome);

routes.get("/admin", adminController.viewAdmin);

routes.get("/article/:id", articleController.viewArticle);

routes.post("/addComment", articleController.addComment);

routes.get("/edit/:id", adminController.adminEdit);

module.exports = routes;
