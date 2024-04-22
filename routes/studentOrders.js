router = require("express").Router();
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Order = require("../models/Order");

router.get("/orders", async (req, res) => {
  if (req.isAuthenticated()) {
    if (process.env.SUPERUSER === "true") {
      res.redirect("/");
    } else {
      res.render("student/order", {
        orders: await Order.find({ rollNo: req.user.rollNumber }),
      });
    }
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
