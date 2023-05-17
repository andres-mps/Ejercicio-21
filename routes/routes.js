const express = require("express");
const router = express.Router();

const pagesController = require("../controllers/pagesController");
const adminController = require("../controllers/adminController");
const articleController = require("../controllers/articleController");
const commentController = require("../controllers/commentController");
const userController = require("../controllers/userController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const atLeastAdmin = require("../middlewares/atLeastAdmin");
const atLeastEditor = require("../middlewares/atLeastEditor");
const atLeastWriter = require("../middlewares/atLeastWriter");
const atLeastReader = require("../middlewares/atLeastReader");
const isOwner = require("../middlewares/isOwner");
const atLeastEditorOwner = require("../middlewares/atLeastEditorOwner");

router.get("/", pagesController.showHome);

router.get("/adminArticles", ensureAuthenticated, atLeastWriter, adminController.viewAdmin);
router.get("/article/:id", articleController.viewArticle);

router.post("/article/:id", ensureAuthenticated, atLeastReader, commentController.store);

router.get(
  "/admin/editar/:id",
  ensureAuthenticated,
  atLeastWriter,
  isOwner,
  adminController.adminEdit,
);
router.post("/admin/editar/:id", adminController.update);
router.get(
  "/admin/eliminar/:id",
  atLeastWriter,
  isOwner,
  atLeastEditorOwner,
  adminController.destroy,
);
router.get("/new", (req, res) => res.render("newArticle"));
router.post("/new", adminController.newArticle);

/*===PRIVATE ROUTES: ADMIN =====*/

router.get("/login", userController.showLogin);
router.post("/login", userController.login);
router.get("/registerUser", userController.showRegister);
router.post("/registerUser", userController.register);
router.get("/logout", userController.logout);

router.get("/adminUsers", ensureAuthenticated, userController.index);
router.get("/adminUsers/editar/:id", userController.edit);
router.post("/adminUsers/editar/:id", userController.update);
router.get("/adminUsers/eliminar/:id", userController.destroy);

module.exports = router;
