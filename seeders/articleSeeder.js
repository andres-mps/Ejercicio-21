const { faker } = require("@faker-js/faker");
const { Article } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const articles = [];

  for (let i = 0; i < 100; i++) {
    articles.push({
      title: faker.lorem.sentence(5),
      content: faker.lorem.paragraphs(),
      userId: faker.datatype.number({ min: 1, max: 25 }),
    });
  }

  await Article.bulkCreate(articles);
};
