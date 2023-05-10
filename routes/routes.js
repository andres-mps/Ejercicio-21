const express = require("express");
const routes = express.Router();
const homeController = require("../controllers/homeController");
const adminController = require("../controllers/adminController");
const articleController = require("../controllers/articleController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

routes.get("/", homeController.viewHome);

routes.get("/admin", ensureAuthenticated, adminController.viewAdmin);

routes.get("/article/:id", articleController.viewArticle);

routes.post("/addComment", ensureAuthenticated, articleController.addComment);

routes.get("/edit/:id", adminController.adminEdit);

routes.post("/edit/:id", adminController.update);

routes.get("/new", (req, res) => res.render("new"));

routes.post("/new", adminController.newArticle);

module.exports = routes;
