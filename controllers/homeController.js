const { format } = require("date-fns");
const { es } = require("date-fns/locale");
const { Article, User } = require("../models");

async function viewHome(req, res) {
  const articles = await Article.findAll({
    limit: 4,
    order: [["createdAt", "DESC"]],
  });

  for (i = 0; i < articles.length; i++) {
    const day = format(articles[i].createdAt, "d");
    const month = format(articles[i].createdAt, "LLLL", { locale: es });
    const monthUpperCase = month.charAt(0).toUpperCase();
    const year = format(articles[i].createdAt, "yyyy");
    const fullDate = `el ${day} de ${monthUpperCase}${month.slice(1)}, ${year}`;

    articles[i].date = fullDate;
  }

  for (i = 0; i < articles.length; i++) {
    const user = await User.findByPk(articles[i].userId);
    articles[i].userId = user;
  }
  res.render("home", { articles });
}

module.exports = {
  viewHome,
};
