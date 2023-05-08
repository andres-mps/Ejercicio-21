//en teoría esta función es para que se vean los comentarios en el artículo
//ordenados por fecha de creación- Paty

async function viewArticle(req, res) {
  const articleId = req.params.id;
  const comments = await Comment.findAll({
    where: { articleId },
    order: [["createdAt", "ASC"]],
  });
  res.render("article", { comments });
}
//----------------------------------------------------------
async function addComment(req, res) {
  try {
    const { name, comment } = req.body;
    const newComment = await Comment.create({
      name,
      comment,
      article: req.params.id,
    });
    res.redirect("/article");
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  viewArticle,
  addComment,
};
