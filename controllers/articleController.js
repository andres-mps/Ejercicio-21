const { Comment } = require("../models/main");
const { Article } = require("../models/main");
const { User } = require("../models/main");

async function viewArticle(req, res) {
  try {
    const articleId = req.params.id;
    const article = await Article.findByPk(articleId, { include: User });
    const comments = await Comment.findAll({ order: [["createdAt", "DESC"]] });
    const commentCount = await Comment.count();
    return res.render("article", { article, comments, commentCount });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving article and comments");
  }
}

async function addComment(req, res) {
  try {
    const { name, content } = req.body;
    await Comment.create({ name, content });
    res.redirect(`/article`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating comment");
  }
}

module.exports = {
  viewArticle,
  addComment,
};
