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

routes.post("/edit/:id", adminController.update);

routes.get("/new", (req, res) => res.render("new"));

routes.post("/new", adminController.newArticle);

routes.get("/login", (req, res) => res.render("login"));

module.exports = routes;
