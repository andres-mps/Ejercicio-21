//en teoría esta función es para que se vean los comentarios en el artículo
//ordenados por fecha de creación

async function viewArticle(req, res) {
  const articleId = req.params.id;
  const comments = await Comment.findAll({
    where: { articleId },
    order: [["createdAt", "ASC"]],
  });
  res.render("article", { comments });
}

module.exports = {
  viewArticle,
};
