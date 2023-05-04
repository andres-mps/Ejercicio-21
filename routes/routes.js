const express = require("express");
const routes = express.Router();
const mainController = require("../controllers/mainControllers.js");

<<<<<<< Updated upstream
routes.get("/", (req, res) => {
  res.render("home");
});

module.exports = routes;
=======
routes.get("/admin", mainController.viewAdmin);




module.exports= routes;
>>>>>>> Stashed changes
