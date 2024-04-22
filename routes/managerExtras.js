router = require("express").Router();
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Extra = require("../models/Extra");

router.get("/manager/extras", async (req, res) => {
  const flag = req.query.flag;
  if (req.isAuthenticated()) {
    if (process.env.SUPERUSER === "true") {
      res.render("manager/extras", { extrasMenu: await Extra.find({}) , flag : flag});
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
});

router.post("/manager/extras/add", async (req, res) => {
  const extra = new Extra({
    name: req.body.newItem.trim().replace(/\s+/g, " "),
    price: req.body.price,
  });
  let flag =0;
  try {
    function isWhitespaceString(str) {
      return /^\s*$/.test(str);
    }
    if (
      !isWhitespaceString(req.body.newItem) &&
      !isWhitespaceString(req.body.price)
    ) {
      try {
        const result = await Extra.updateOne(
          { name: req.body.newItem.trim().replace(/\s+/g, " ") },
          { price: req.body.price }
        );
        console.log(result.nModified);

        if (result.modifiedCount === 0) {
          await extra.save();
          flag = 1;
        }
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }

  res.redirect("/manager/extras?flag=" + flag);
});

router.post("/manager/extras/remove", async (req, res) => {
  let flag = 2;
  await Extra.findByIdAndRemove(req.body.button);
  res.redirect("/manager/extras?flag=" + flag);
});

module.exports = router;
