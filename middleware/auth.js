
module.exports = {
    //this ensures that if the user is NOT logged in, then it will redirect them to the '/' route to login
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      console.log("This checks out")
      return next();
    } else {
      res.redirect("/");
    }
  },

  // this ensures that a user is NOT logged in, it will automatically direct them to the dashboard and NOT the login screen.
  ensureNotLoggedIn: function (req, res, next) {
    if (req.isAuthenticated()) {
      console.log("you've already been through security")
      res.redirect("/dashboard");
    } else {
      return next();
    }
  },
};
