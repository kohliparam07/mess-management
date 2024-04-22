router = require("express").Router();
require("dotenv").config();

router.get("/register", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/login");
  } else {
    let flag = 0;
    flag = req.query.flag;
    res.render("register", { flag: flag, email: req.query.email });
  }
});

router.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    let flag = 0;
    flag = req.query.flag;
    res.render("login", { flag: flag });
  }
});

module.exports = router;
