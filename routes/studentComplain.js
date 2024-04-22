router = require("express").Router();
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Complaint = require("../models/Complaint");
const User = require("../models/User");

router.get("/complain", async (req, res) => {
  const flag = req.query.flag;
  if (req.isAuthenticated()) {
    if (process.env.SUPERUSER === "true") {
      res.redirect("/");
    } else {
      res.render("student/complain", {
        complaints: await Complaint.find({ rollNo: req.user.rollNumber }),flag : flag
      });
    }
  } else {
    res.redirect("/login");
  }
});

router.post("/complain", async (req, res) => {
  let flag = 3;
  const complaint = new Complaint({
    rollNo: req.user.rollNumber,
    issue: req.body.text,
    reply: "pending",
  });
  console.log(req.body);
  function isWhitespaceString(str) {
    return /^\s*$/.test(str);
  }
  if (!isWhitespaceString(req.body.text)) {
    await complaint.save();
    flag=2;
  }

  res.redirect("/complain?flag=" + flag);
});

router.post("/complain/remove", async (req, res) => {
  const flag = 1;
  await Complaint.findByIdAndRemove(req.body.button);
  console.log("removed successfully");
  res.redirect("/complain?flag=" + flag);
});

module.exports = router;
