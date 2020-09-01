const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// url routes ending in /auth

//Auth with Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

//Google Auth callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    let token = req.user.token;
    res.json({
      status: "Success",
      redirect: "http://localhost:3000/dashboard/?token=" + token,
    });
  }
);

//Auth with Facebook
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  })
);

//Facebook Auth callback
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  (req, res) => {
    let token = req.user.token;
    res.json({
        status: "Success",
        redirect: "http://localhost:3000/dashboard/?token=" + token,
      });
  }
);

//Auth with Username and Password
router.post("/login", (req, res, next) => {
  console.log(req.body);
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send(info.message);
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("logged in");
        console.log(req.user);
      });
    }
  })(req, res, next);
});

//Register a new user
router.post("/register", (req, res) => {
  if (req.body.email === "" || req.body.password === "")
    res.send("Must provide username or password");
  User.findOne({ email: req.body.email }, async (err, doc) => {
    if (err) throw err;
    if (doc) {
      res.send("User Already Exists");
      console.log("User Already Exists Backend");
    }
    if (!doc) {
      const hash = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        email: req.body.email,
        password: hash,
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});

//logout user
router.get("/logout", (req, res) => {
  req.logout();
  res.send("loggedout!!!1!");
});

module.exports = router;
