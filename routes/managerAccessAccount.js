router = require("express").Router();
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Bill = require("../models/Bill");
const User = require("../models/User");
const Rebate = require("../models/Rebate");
const ActiveRebate = require("../models/ActiveRebate");
const PastBill = require("../models/PastBill");

router.get("/manager/accessAccount", async (req, res) => {
  let flag = req.query.flag;
  if (req.isAuthenticated()) {
    if (process.env.SUPERUSER === "true") {

      res.render("manager/accessAccount", {
        flag: flag,
        session: req.session,
        pastBills:await PastBill.find({})
      });
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
});

router.post("/manager/accessAccount", async (req, res) => {
  const students = await User.find({});
  const start = req.body.startDate;
  const end = req.body.endDate;
  let date_obj = new Date(start);
  let formattedStart = date_obj.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  date_obj = new Date(end);
  let formattedEnd = date_obj.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const date1 = new Date(start).getTime();
  const date2 = new Date(end).getTime();
  console.log(formattedStart + formattedEnd);

  const pastBills = await PastBill.find({});

  let flag = 0;
  let prev_date_1, prev_date_2;

  if (date2 < date1) {
    flag = 2;
  }

  for (let i = 0; i < pastBills.length && flag === 0; i++) {
    prev_date_1 = new Date(pastBills[i].startDate);
    prev_date_2 = new Date(pastBills[i].endDate);
    if (
      (date1 >= prev_date_1.getTime() && date1 <= prev_date_2.getTime()) ||
      (date2 >= prev_date_1.getTime() && date2 <= prev_date_2.getTime()) ||
      (date1 < prev_date_1.getTime() && date2 > prev_date_2.getTime())
    ) {
      flag = 1;
    }
  }

  if (flag == 0) {
    const workingDays =
      Math.ceil(Math.abs(date2 - date1) / (1000 * 3600 * 24)) + 1;
    console.log(workingDays);
    for (let i = 0; i < students.length; i++) {
      let totalCost = 0;
      const studentRebate = await Rebate.find({
        rollNo: students[i].rollNumber,
      });
      const activeRebate = await ActiveRebate.find({
        rollNo: students[i].rollNumber,
      });

      studentRebate.push(activeRebate);

      let rebate_days = 0;
      for (let i = 0; i < studentRebate.length; i++) {
        if (studentRebate[i].daysUsed >= studentRebate[i].days) {
          continue;
        }
        let thisRebateDays = 0;
        const rebate_start = new Date(studentRebate[i].startDate).getTime();
        const rebate_end = new Date(studentRebate[i].endDate).getTime();
        if (
          rebate_start <= date1 &&
          rebate_end >= date1 &&
          rebate_end <= date2
        ) {
          thisRebateDays =
            Math.ceil(Math.abs(rebate_end - date1) / (1000 * 3600 * 24)) + 1;
        } else if (
          rebate_start >= date1 &&
          rebate_start <= date2 &&
          rebate_end >= date2
        ) {
          thisRebateDays =
            Math.ceil(Math.abs(date2 - rebate_start) / (1000 * 3600 * 24)) + 1;
        } else if (
          rebate_start >= date1 &&
          rebate_start <= date2 &&
          rebate_end >= date1 &&
          rebate_end <= date2
        ) {
          thisRebateDays =
            Math.ceil(
              Math.abs(rebate_end - rebate_start) / (1000 * 3600 * 24)
            ) + 1;
        } else if (rebate_start <= date1 && rebate_end >= date2) {
          thisRebateDays = workingDays;
        }

        rebate_days += thisRebateDays;

        await User.findByIdAndUpdate(studentRebate[i]._id, {
          $inc: { daysUsed: thisRebateDays },
        });
      }

      if (workingDays >= rebate_days) {
        totalCost =
          (workingDays - rebate_days) * req.body.dailyCost +
          students[i].extrasCost;
      } else {
        totalCost = students[i].extrasCost;
      }
      const bill = new Bill({
        rollNo: students[i].rollNumber,
        startDate: formattedStart,
        endDate: formattedEnd,
        workingDays: workingDays,
        dailyCost: req.body.dailyCost,
        rebateDays: rebate_days,
        extrasCost: students[i].extrasCost,
        total: totalCost,
      });
      bill.save();
      await User.findOneAndUpdate(
        { rollNumber: bill.rollNo },
        { extrasCost: 0, $inc: { dues: totalCost } }
      );
      flag = 3;
    }

    const pastBill = new PastBill({
      startDate: formattedStart,
      endDate: formattedEnd,
      dailyCost: req.body.dailyCost,
      workingDays:workingDays
    });

    pastBill.save();
  }
  res.redirect("/manager/accessAccount?flag=" + flag);
});

router.post("/manager/accessAccount/find", async (req, res) => {
  let flag = 0;
  const user = await User.findOne({ rollNumber: req.body.rollNumber });
  
  if (user) {
    if (user.dues == 0) {
      req.session.currentDues = 0;
    } else {
      req.session.currentDues = parseInt(user.dues);
    }
    if (user.extrasCost == 0) {
      req.session.currentExtras = 0;
    } else {
      req.session.currentExtras = parseInt(user.extrasCost);
    }
    req.session.currentRollNumber = parseInt(user.rollNumber);
    flag = 6;
  } else {
    // Handle case when user is not found
    flag = 5;
    console.log("User not found");
  }

  res.redirect("/manager/accessAccount?flag=" + flag);
});

router.post("/manager/accessAccount/update", async (req, res) => {
  console.log(req.body.newDues)
  let flag = 0;
  await User.updateOne(
    { rollNumber: req.body.rollNumber },
    { dues: parseInt(req.body.newDues), extrasCost: parseInt(req.body.newExtras) }
  );
  const user = await User.findOne({ rollNumber: req.body.rollNumber });
  console.log(user.dues)
  if (user) {
    if (user.dues == 0) {
      req.session.currentDues = 0;
    } else {
      req.session.currentDues = parseInt(user.dues);
    }
    if (user.extrasCost == 0) {
      req.session.currentExtras = 0;
    } else {
      req.session.currentExtras = parseInt(user.extrasCost);
    }
    req.session.currentRollNumber = parseInt(user.rollNumber);
    console.log(req.session.currentDues);
    flag = 4;
  } else {
    
    // Handle case when user is not found
    console.log("User not found");
  }

  res.redirect("/manager/accessAccount?flag=" + flag);
});

module.exports = router;
