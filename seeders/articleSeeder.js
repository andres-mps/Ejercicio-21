const { faker } = require("@faker-js/faker");

faker.locale = "es";

module.exports = async (Article) => {
  const articles = [];

  for (let i = 0; i < 500; i++) {
    articles.push({
      title: faker.lorem.sentence(5),
      content: faker.lorem.paragraphs(),
    });
  }

  await Article.bulkCreate(articles);
};
