const { Comment } = require("../models");
const { Article } = require("../models");
const { User } = require("../models");

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
    res.redirect(`back`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating comment");
  }
}

module.exports = {
  viewArticle,
  addComment,
};
