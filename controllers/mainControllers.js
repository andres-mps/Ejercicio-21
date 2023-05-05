async function viewAdmin(req, res) {
  res.render("admin");
}

async function viewArticle(req, res) {
  res.render("article");
}

module.exports = {
  viewAdmin,
  viewArticle,
};
