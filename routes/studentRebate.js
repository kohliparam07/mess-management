router = require("express").Router();
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("../models/User");
const Rebate = require("../models/Rebate");
const ActiveRebate = require("../models/ActiveRebate");

router.get("/rebate", async (req, res) => {
  const curr_date = new Date().getTime();
  const userActiveRebate = await ActiveRebate.find({
    rollNo: req.user.rollNumber,
  });
  const rebates = await Rebate.find({ rollNo: req.user.rollNumber });

  if (
    userActiveRebate &&
    curr_date > new Date(userActiveRebate.endDate).getTime()
  ) {
    await User.findByIdAndUpdate(req.user._id, {
      startingDate: "NA",
      endingDate: "NA",
      rebateStatus: "NA",
    });

    const rebate = new Rebate({
      rollNo: req.user.rollNumber,
      startDate: userActiveRebate.startDate,
      endDate: userActiveRebate.endDate,
      days: userActiveRebate.days,
      status: userActiveRebate.status,
      daysUsed: userActiveRebate.daysUsed,
    });
    rebate.save();
    await ActiveRebate.findOneAndRemove({ rollNo: req.user.rollNumber });
  }

  if (req.isAuthenticated()) {
    if (process.env.SUPERUSER === "true") {
      res.redirect("/");
    } else {
      res.render("student/rebate", {
        rebates: rebates,
        student: req.user,
        flag: req.query.flag,
      });
    }
  } else {
    res.redirect("/login");
  }
});

router.post("/rebate", async (req, res) => {
  const start_date = req.body.startDate;
  const end_date = req.body.endDate;

  const date1 = new Date(start_date);
  const date2 = new Date(end_date);
  const curr_date = new Date();
  const startDate = date1.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const endDate = date2.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  let flag = 0;

  if (req.user.rebateStatus !== "NA") {
    flag = 1;
  }

  if (date2.getTime() < date1.getTime()) {
    flag = 3;
  }
  if (date1.getTime() >= curr_date.getTime() && flag == 0) {
    await User.findByIdAndUpdate(req.user._id, {
      startingDate: startDate,
      endingDate: endDate,
      rebateStatus: "pending",
    });
    const diff = Math.abs(date2.getTime() - date1.getTime()) + 1;
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    console.log(diffDays);
    const activeRebate = new ActiveRebate({
      rollNo: req.user.rollNumber,
      startDate: startDate,
      endDate: endDate,
      days: diffDays,
      status: "pending",
      daysUsed: 0,
    });
    flag = 2;
    activeRebate.save();
  }

  res.redirect("/rebate?flag=" + flag);
});

router.post("/student/rebatewithdraw", async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    startingDate: "NA",
    endingDate: "NA",
    rebateStatus: "NA",
  });
  await ActiveRebate.findOneAndRemove({ rollNo: req.user.rollNumber });
  res.redirect("/rebate?flag=4");
});

module.exports = router;
