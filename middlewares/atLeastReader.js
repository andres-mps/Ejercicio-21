function atLeastReader(req, res, next) {
  if (req.user.roleId >= 1) {
    next();
  } else {
    return res.redirect("back");
  }
}

module.exports = atLeastReader;
