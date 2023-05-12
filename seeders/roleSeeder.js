const { faker } = require("@faker-js/faker");
const { Role } = require("../models");
faker.locale = "es";

module.exports = async () => {
  const roles = [];

  rolesNames = ["Lector", "Escritor", "Editor", "Administrador"];
  for (let i = 0; i < rolesNames.length; i++) {
    roles.push({
      name: rolesNames[i],
    });
  }

  await Role.bulkCreate(roles);
};
