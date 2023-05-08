const { Article, User } = require("../models/main");

async function viewHome(req, res) {
  const articles = await Article.findAll({
    limit: 4,
    order: [["createdAt", "DESC"]],
  });

  for (i = 0; i < articles.length; i++) {
    const user = await User.findByPk(articles[i].userId);
    articles[i].userId = user;
  }

  res.render("home", { articles });
}

module.exports = {
  viewHome,
};
