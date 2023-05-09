//en teoría esta función es para que se vean los comentarios en el artículo
//ordenados por fecha de creación
// const Comment = require('../models/Comment');

// async function viewArticle(req, res) {
//   try {
//     const comments = await Comment.findAll({ order: [['createdAt', 'DESC']] });
//     const commentCount = await Comment.count();
//     res.render("article", { comments, commentCount });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error retrieving comments");
//   }
// }

// async function addComment(req, res) {
//   try {
//     const { name, content } = req.body;
//     await Comment.create({ name, content });
//     res.redirect(`/article`);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error creating comment");
//   }
// }

// async function commentsUnder(req, res) {

// }

// module.exports = {
//   viewArticle,
//   addComment,
// };
// for (i = 0; i < articles.length; i++) {
//   const user = await User.findByPk(articles[i].userId);
//   articles[i].userId = user;
// }

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
