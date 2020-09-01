const express = require("express");
const router = express.Router();
const { ensureAuth, ensureNotLoggedIn } = require('../middleware/auth')

router.get("/", ensureNotLoggedIn, (req, res) =>{
  res.send("login!");
});

router.get("/dashboard", ensureAuth, (req, res) =>{
  res.send("dashboard!");
});

module.exports = router;
