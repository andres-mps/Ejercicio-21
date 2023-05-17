const { faker } = require("@faker-js/faker");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
faker.locale = "es";

module.exports = async () => {
  const users = [];

  users.push({
    id: 0,
    firstname: "Anonimo",
    lastname: "",
    email: "anonimo@gmail.com",
    password: "",
    roleId: 1,
  });

  for (let i = 0; i < 25; i++) {
    users.push({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: await bcrypt.hash(faker.internet.password(), 5),
      roleId: faker.datatype.number({ min: 1, max: 4 }),
    });
  }

  await User.bulkCreate(users);
};
