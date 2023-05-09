const { Article } = require("../models/main");
const { User } = require("../models/main");
const formidable = require("formidable");

async function viewAdmin(req, res) {
  const articles = await Article.findAll();

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
    const { title, content, img } = req.body;
    const article = await Article.findByPk(req.params.id);

    article.title = title;
    article.content = content;
    article.img = img;

    const result = await article.save();
    return res.redirect("admin", { result });
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

    await Article.create({ title, content });

    return res.redirect("admin");
  });
}

module.exports = {
  viewAdmin,
  adminEdit,
  update,
  newArticle,
};
