const { passport, passportConfig } = require("../config/passport");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
function viewLogin(req, res) {
  res.render("login");
}

function login(req, res) {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: {
      type: "failureFlash",
      message: "Credenciales incorrectas",
    }, // Establece el mensaje flash en caso de fallo de autenticación
    successFlash: {
      type: "successFlash",
      message: "Las credenciales han sido validadas!",
    },
  })(req, res);
}

function viewRegister(req, res) {
  res.render("register");
}

async function register(req, res) {
  const { firstname, lastname, email, password } = req.body;
  const [user, created] = await User.findOrCreate({
    where: { email: email },
    defaults: {
      firstname,
      lastname,
      email,
      password: await bcrypt.hash(password, 5),
    },
  });
  if (created) {
    req.login(user, () => res.redirect("/login"));
  } else {
    res.redirect("back");
  }
}

function logout(req, res) {
  req.session.destroy(function (err) {
    res.redirect("/");
  });
}

module.exports = {
  login,
  viewLogin,
  logout,
  viewRegister,
  register,
};
