router = require("express").Router();
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("../models/User");
const Rebate = require("../models/Rebate");
const ActiveRebate = require("../models/ActiveRebate");

router.get("/manager/rebateApproval", async (req, res) => {
  if (req.isAuthenticated()) {
    if (process.env.SUPERUSER === "true") {
      res.render("manager/rebateApproval.ejs", {
        rebates: await ActiveRebate.find({ status: "pending" }),
      });
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
});

router.post("/manager/rebateApproval/approved", async (req, res) => {
  const rebate = await ActiveRebate.findByIdAndUpdate(req.body.button, {
    status: "Approved",
  });
  await User.findOneAndUpdate(
    { rollNumber: rebate.rollNo },
    { rebateStatus: "Approved" }
  );
  res.redirect("/manager/rebateApproval");
});

router.post("/manager/rebateApproval/rejected", async (req, res) => {
  const rejectedRebate = await ActiveRebate.findByIdAndDelete(req.body.button);
  const rebate = new Rebate({
    rollNo: rejectedRebate.rollNo,
    startDate: rejectedRebate.startDate,
    endDate: rejectedRebate.endDate,
    days: rejectedRebate.days,
    status: "Rejected",
    daysUsed: rejectedRebate.daysUsed,
  });
  rebate.save();
  await User.findOneAndUpdate({ rollNumber: rebate.rollNo }, {
    startingDate: "NA",
    endingDate: "NA",
    rebateStatus: "NA",
  });
  res.redirect("/manager/rebateApproval");
});

module.exports = router;
