//en teoría esta función es para que se vean los comentarios en el artículo
//ordenados por fecha de creación
const Comment = require('../models/Comment');

// async function viewArticle(req, res) {
//   const articleId = req.params.id;
//   const comments = await Comment.findAll({
//     where: { articleId },
//     order: [["createdAt", "ASC"]],
//   });
//   res.render("article", { comments });
// }
async function viewArticle(req, res) {
  res.render("article");
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
