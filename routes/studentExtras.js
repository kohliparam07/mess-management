router = require("express").Router();
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Extra = require("../models/Extra");
const Order = require("../models/Order");
const User = require("../models/User");

router.get("/extras", async (req, res) => {
    if (req.isAuthenticated()) {
      if (process.env.SUPERUSER === "true") {
        res.redirect("/");
      } else {
        let flag=0;
        flag=req.query.flag;
        res.render("student/extras", { extrasMenu: await Extra.find({}) ,flag:flag});
      }
    } else {
      res.redirect("/login");
    }
  });

router.post("/extras", async (req, res) => {

    const list = await Extra.find({});

    if(list.length == 0){
      return res.redirect("/extras?flag=1");
    }
    const items = [],
      prices = [],
      quantities = [],
      statuses=[],
      codes=[];
    let totalCost = 0;
    try {
      for (let i = 0; i < req.body.quantity.length; i++) {
        if (req.body.quantity[i] > 0) {
          items.push(list[i].name);
          prices.push(list[i].price);
          quantities.push(req.body.quantity[i]);
          statuses.push("pending");
          codes.push(Math.floor(Math.random() * 1000000));
          totalCost += req.body.quantity[i] * list[i].price;
        }
      }
    } catch (error) {
      console.log(error)
    }
  
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { extrasCost: totalCost },
    });
    if (items.length != 0) {
      const order = new Order({
        rollNo: req.user.rollNumber,
        itemName: items,
        quantity: quantities,
        price: prices,
        status:statuses,
        code:codes,
        total: totalCost,
      });
      order.save();
      console.log(order);
      res.redirect("/orders");
    } else {
      res.redirect("/extras");
    }
  });

module.exports = router;