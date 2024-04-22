router = require("express").Router();
require("dotenv").config();

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    if (process.env.SUPERUSER === "true") res.redirect("/manager/home");
    else res.render("student/home", { student: req.user });
  } else {
    res.redirect("/login");
  }
});

router.get("/manager/home", (req, res) => {
  if (req.isAuthenticated()) {
    if (process.env.SUPERUSER === "true") {
      res.redirect("/manager/order");
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
