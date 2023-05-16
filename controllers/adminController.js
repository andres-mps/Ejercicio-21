const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const { Article } = require("../models");
const { User } = require("../models");
const formidable = require("formidable");

async function viewAdmin(req, res) {
  /* =============  Página ADMIN despliega TODOS los articulos ===========*/
  // const articles = await Article.findAll();
  // for (i = 0; i < articles.length; i++) {
  //   const name = await User.findByPk(articles[i].userId);
  //   articles[i].userId = name;
  // }

  /* =============  Página ADMIN solo despliega articulos del userID autenticado: ===========*/
  const articles = await Article.findAll({
    where: { userId: req.user.id },
  });
  for (i = 0; i < articles.length; i++) {
    const name = await User.findByPk(articles[i].userId);
    articles[i].userId = name;
  }
  res.render("admin", { articles });
}

async function adminEdit(req, res) {
  const article = await Article.findByPk(req.params.id);
  if (!article) {
    return res.status(404).send("Article not found");
  }
  return res.render("edit", { article });
}

async function update(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/admin",
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
    return res.redirect("/admin");
  });
}

async function newArticle(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img/",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    const userId = res.locals.user.id;
    const { title, content } = fields;
    await Article.create({ title, content, userId });

    return res.redirect("/admin");
  });
}

/*============= LOGIN CONTROLLERS  =================*/
function viewLogin(req, res) {
  res.render("login");
}

/*============= LOGIN CONTROLLERS  =================*/

module.exports = {
  viewAdmin,
  adminEdit,
  update,
  newArticle,
  viewLogin,
};
