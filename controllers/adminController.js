const { Article, User, Role, Comment } = require("../models");
const formidable = require("formidable");

async function viewAdmin(req, res) {
  const articles = await Article.findAll({
    // where: { userId: req.user.id },
    order: ["createdAt"],
    include: {
      model: User,
      include: Role,
    },
  });
  // res.json(articles);
  console.log(req.user);
  res.render("adminArticles", { articles });
}

async function adminEdit(req, res) {
  const article = await Article.findByPk(req.params.id);
  if (!article) {
    return res.status(404).send("Article not found");
  }
  return res.render("editArticle", { article });
}

async function update(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/adminArticles",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    const { title, content, img } = fields;
    const article = await Article.findByPk(req.params.id);

    article.title = title;
    article.content = content;
    article.img = img;

    await article.save();
    const successMsg = "Artículo actualizado exitosamente.";
    res.locals.successMsg = successMsg;
    return res.redirect("/adminArticles");
  });
}

async function newArticle(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img/",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    const { title, content } = fields;
    const userId = req.user.id;
    console.log(userId);

    await Article.create({
      title,
      content,
      userId: userId,
    });

    return res.redirect("adminArticles");
  });
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const articleId = req.params.id;
  await Article.destroy({
    where: {
      id: articleId,
    },
  });
  res.redirect("/adminArticles");
}

module.exports = {
  viewAdmin,
  adminEdit,
  update,
  newArticle,
  destroy,
};
