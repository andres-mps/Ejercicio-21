const { Article } = require("../models");

async function atLeastEditorOwner(req, res, next) {
  const { userId } = await Article.findByPk(req.params.id);
  if (req.user && req.user.id === userId) {
    return next();
  }
  if ((req.user.roleId = 4)) {
    return next();
  }
  return res.redirect("back");
}

module.exports = atLeastEditorOwner;
