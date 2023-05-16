const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const adminController = require("../controllers/adminController");
const articleController = require("../controllers/articleController");
const authController = require("../controllers/authController");
const usersController = require("../controllers/usersController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const mwFlash = require("../middleware/flash");

router.get("/", homeController.viewHome);

router.get("/admin", ensureAuthenticated, adminController.viewAdmin);

router.get("/article/:id", articleController.viewArticle);

router.post("/addComment", articleController.addComment);

router.get("/edit/:id", adminController.adminEdit);

router.post("/edit/:id", adminController.update);

router.get("/new", (req, res) => res.render("new"));

router.post("/new", adminController.newArticle);

/*===PRIVATE ROUTES: ADMIN =====*/

router.get("/login", authController.viewLogin);
router.post("/login", authController.login);
router.get("/register", authController.viewRegister);
router.post("/register", authController.register);
router.get("/logout", authController.logout);

/*=== fin PRIVATE ROUTES: ADMIN =====*/

router.get("/users", ensureAuthenticated, usersController.viewUsers);
router.get("/users/delete/:id", usersController.remove);
router.post("/users/updateRole/:userId", usersController.updateUserRole);
module.exports = router;
