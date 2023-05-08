//en teoría esta función es para que se vean los comentarios en el artículo
//ordenados por fecha de creación
const connection = require("../models/main")

async function viewArticle(req, res) {
  const articleId = req.params.id;
  const comments = await Comment.findAll({
    where: { articleId },
    order: [["createdAt", "ASC"]],
  });
  res.render("article", { comments });
}

async function addComment(req, res) {
  try{
    const { name,content } = req.body;
    const result = (await connection).execute("INSERT INTO comments (name, content) VALUES (?, ?)", [name, content]);
    res.redirect("/article");
} catch (error) {
    console.error(error);
    res.status(500).send("Error creating comment");
};
}


module.exports = {
  viewArticle,
  addComment,
};
