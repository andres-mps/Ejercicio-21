const { Article } = require("../models/main");

async function viewAdmin(req, res) {
  const articles = await Article.findAll();
  res.render("admin", { articles });
}

//async function adminEdit(req,res){
//  const {comment} = await
//}

/* async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {} */

module.exports = {
  viewAdmin,
};
