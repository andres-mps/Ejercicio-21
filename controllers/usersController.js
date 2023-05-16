const { User, Role } = require("../models");

async function viewUsers(req, res) {
  try {
    const users = await User.findAll({
      order: [["createdAt", "DESC"]],
      include: Role,
    });
    const roles = await Role.findAll();

    return res.render("users", { users, roles });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving article and comments");
  }
}

async function remove(req, res) {
  const userId = req.params.id;
  await User.destroy({
    where: {
      id: userId,
    },
  });
  res.redirect("back");
}
async function updateUserRole(req, res) {
  const userId = req.params.userId;
  const { roleId } = req.body;
  // Actualizar el role del usuario en la base de datos
  await User.update({ roleId }, { where: { id: userId } });
  res.redirect("/");
}

module.exports = {
  viewUsers,
  remove,
  updateUserRole,
};
