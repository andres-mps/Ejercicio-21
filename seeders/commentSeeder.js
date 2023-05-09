const { faker } = require("@faker-js/faker");
const { Comment } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const comments = [];

  for (let i = 0; i < 1000; i++) {
    comments.push({
      name: faker.name.firstName(),
      content: faker.lorem.paragraph(2),
      articleId: faker.datatype.number({ min: 1, max: 500 }),
    });
  }

  await Comment.bulkCreate(comments);
};
