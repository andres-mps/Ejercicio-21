const Comment = require("./models/comment");

async function viewArticle(req, res) {
  const articleId = req.params.id;
  const comments = await Comment.findAll({
    where: { articleId },
    order: [["createdAt", "ASC"]],
  });
  res.render("article"), { comments };
}

module.exports = {
  viewArticle,
};
