const { Article } = require("../models/main");
const { User } = require("../models/main");

async function viewAdmin(req, res) {
  const articles = await Article.findAll();

  for (i = 0; i < articles.length; i++) {
    const name = await User.findByPk(articles[i].userId);
    articles[i].userId = name;
  }

  res.render("admin", { articles });
}

async function adminEdit(req, res) {
  //const articles = await Article.findAll();
  res.render("/edit");
}

/* async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {} */

module.exports = {
  viewAdmin,
  adminEdit,
};
