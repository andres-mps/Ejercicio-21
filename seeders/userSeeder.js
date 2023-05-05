const { faker } = require("@faker-js/faker");

faker.locale = "es";

module.exports = async (User) => {
  const users = [];

  for (let i = 0; i < 50; i++) {
    users.push({
      firstname: faker.name.firstName,
      lastname: faker.name.lastName,
      email: faker.internet.email(),
    });
  }

  await User.bulkCreate(users);
};
