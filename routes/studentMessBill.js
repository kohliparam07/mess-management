router = require("express").Router();
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Bill = require("../models/Bill");

router.get("/mess-bill", async (req, res) => {
  if (req.isAuthenticated()) {
    if (process.env.SUPERUSER === "true") {
      res.redirect("/");
    } else {
      res.render("student/mess-bill", {
        bills: await Bill.find({ rollNo: req.user.rollNumber }),
      });
    }
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
