const { passport, passportConfig } = require("../config/passport");
const { Article, User, Role, Comment } = require("../models");
const bcrypt = require("bcryptjs");

function showLogin(req, res) {
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

function showRegister(req, res) {
  res.render("registerUser");
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
      roleId: req.body.role ? req.body.role : 1,
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

async function index(req, res) {
  const users = await User.findAll({
    include: Role,
  });
  // res.json(users);
  res.render("adminUsers", { users });
}

async function edit(req, res) {
  const usersToEdit = await User.findByPk(req.params.id, {
    include: [{ model: Role }],
  });
  res.render("updateUser", { usersToEdit });
}

async function update(req, res) {
  const userId = req.params.id;
  const { firstname, lastname, email, role } = req.body;
  const user = await User.update(
    {
      firstname,
      lastname,
      email,
      roleId: role,
    },
    { where: { id: userId } },
  );
  return res.redirect("/adminUsers");
}

async function destroy(req, res) {
  const userId = req.params.id;
  await Article.destroy({ where: { userId: userId } });
  await Comment.update({ userId: 0 }, { where: { userId: userId } });
  await User.destroy({ where: { id: userId } });
  res.redirect("/adminUsers");
}

module.exports = {
  login,
  showLogin,
  logout,
  showRegister,
  register,
  index,
  edit,
  update,
  destroy,
};
