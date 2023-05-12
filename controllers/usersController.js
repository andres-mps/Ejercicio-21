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

module.exports = {
  viewUsers,
};
