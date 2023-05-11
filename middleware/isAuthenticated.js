function isAuthenticated(req, res, next) {
  res.locals.login = req.isAuthenticated();
  next();
}

module.exports = isAuthenticated;
