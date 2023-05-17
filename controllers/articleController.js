const { Comment, Article, User, Role } = require("../models");

async function viewArticle(req, res) {
  const articleId = req.params.id;
  const article = await Article.findByPk(articleId, { include: User });
  const comments = await Comment.findAll({
    order: [["createdAt", "DESC"]],
    where: {
      articleId: articleId,
    },
    include: User,
  });
  const commentCount = await Comment.count();
  // res.json(article);
  return res.render("article", { article, comments, commentCount });
}

module.exports = {
  viewArticle,
};
