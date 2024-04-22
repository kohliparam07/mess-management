router = require("express").Router();
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Order = require("../models/Order");

router.get("/manager/order", async (req, res) => {
  if (req.isAuthenticated()) {
    if (process.env.SUPERUSER === "true") {
      let i=0,j=0;
      res.render("manager/order", {
        orders: await Order.find({}),
        session: req.session,
        i: i,
        j: j,
      });
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
});

router.post("/manager/order", async (req, res) => {
  try {
    const parts = req.body.string.split(" ");
    req.session.flag = 1;
    const orderId = parts[0]; // First part
    const index = parts[1]; // Second part
    req.session.orderId = orderId;
    req.session.index = index;
    console.log(req.body);
  } catch (err) {
    console.log(err);
  }

  res.redirect("/manager/order");
});

router.post("/code", async (req, res) => {
  const order = await Order.findById(req.session.orderId);
  console.log(req.session.orderId);
  console.log(parseInt(req.body.code));
  console.log(parseInt(order.code[req.session.index]))
  if (parseInt(req.body.code) == parseInt(order.code[req.session.index])) {
    req.session.flag = 2;
    await Order.findByIdAndUpdate(req.session.orderId, {
      $set: { [`status.${req.session.index}`]: "cleared" },
    });
  } else {
    req.session.flag = 3;
  }
  console.log(req.body);
  res.redirect("/manager/order");
});

module.exports = router;
