function atLeastEditor(req, res, next) {
  if (req.user.roleId === 3 || req.user.roleId === 4) {
    next();
  } else {
    return res.redirect("back");
  }
}

module.exports = atLeastEditor;
