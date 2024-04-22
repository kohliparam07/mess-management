router = require("express").Router();
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Item = require("../models/Item");

router.get("/mess-menu", async (req, res) => {
  if (req.isAuthenticated()) {
    if (process.env.SUPERUSER === "true") {
      res.redirect("/");
    } else {
      const menu = await Item.find({});
      const a1 = [];
      const a2 = [];
      const a3 = [];
      const a4 = [];
      const a5 = [];
      const a6 = [];
      const a7 = [];
      const a8 = [];
      const a9 = [];
      const a10 = [];
      const a11 = [];
      const a12 = [];
      const a13 = [];
      const a14 = [];
      const a15 = [];
      const a16 = [];
      const a17 = [];
      const a18 = [];
      const a19 = [];
      const a20 = [];
      const a21 = [];
      const a22 = [];
      const a23 = [];
      const a24 = [];
      const a25 = [];
      const a26 = [];
      const a27 = [];
      const a28 = [];
      const a29 = [];
      const a30 = [];
      const a31 = [];
      const a32 = [];
      const a33 = [];
      const a34 = [];
      const a35 = [];
      const a36 = [];
      const a37 = [];
      const a38 = [];
      const a39 = [];
      const a40 = [];
      const a41 = [];
      const a42 = [];

      for (let i = 0; i < menu.length; i++) {
        if (menu[i].code === 110) {
          a1.push(menu[i]);
        }
        if (menu[i].code === 111) {
          a2.push(menu[i]);
        }
        if (menu[i].code === 120) {
          a3.push(menu[i]);
        }
        if (menu[i].code === 121) {
          a4.push(menu[i]);
        }
        if (menu[i].code === 130) {
          a5.push(menu[i]);
        }
        if (menu[i].code === 131) {
          a6.push(menu[i]);
        }
        if (menu[i].code === 210) {
          a7.push(menu[i]);
        }
        if (menu[i].code === 211) {
          a8.push(menu[i]);
        }
        if (menu[i].code === 220) {
          a9.push(menu[i]);
        }
        if (menu[i].code === 221) {
          a10.push(menu[i]);
        }
        if (menu[i].code === 230) {
          a11.push(menu[i]);
        }
        if (menu[i].code === 231) {
          a12.push(menu[i]);
        }
        if (menu[i].code === 310) {
          a13.push(menu[i]);
        }
        if (menu[i].code === 311) {
          a14.push(menu[i]);
        }
        if (menu[i].code === 320) {
          a15.push(menu[i]);
        }
        if (menu[i].code === 321) {
          a16.push(menu[i]);
        }
        if (menu[i].code === 330) {
          a17.push(menu[i]);
        }
        if (menu[i].code === 331) {
          a18.push(menu[i]);
        }
        if (menu[i].code === 410) {
          a19.push(menu[i]);
        }
        if (menu[i].code === 411) {
          a20.push(menu[i]);
        }
        if (menu[i].code === 420) {
          a21.push(menu[i]);
        }
        if (menu[i].code === 421) {
          a22.push(menu[i]);
        }
        if (menu[i].code === 430) {
          a23.push(menu[i]);
        }
        if (menu[i].code === 431) {
          a24.push(menu[i]);
        }
        if (menu[i].code === 510) {
          a25.push(menu[i]);
        }
        if (menu[i].code === 511) {
          a26.push(menu[i]);
        }
        if (menu[i].code === 520) {
          a27.push(menu[i]);
        }
        if (menu[i].code === 521) {
          a28.push(menu[i]);
        }
        if (menu[i].code === 530) {
          a29.push(menu[i]);
        }
        if (menu[i].code === 531) {
          a30.push(menu[i]);
        }
        if (menu[i].code === 610) {
          a31.push(menu[i]);
        }
        if (menu[i].code === 611) {
          a32.push(menu[i]);
        }
        if (menu[i].code === 620) {
          a33.push(menu[i]);
        }
        if (menu[i].code === 621) {
          a34.push(menu[i]);
        }
        if (menu[i].code === 630) {
          a35.push(menu[i]);
        }
        if (menu[i].code === 631) {
          a36.push(menu[i]);
        }
        if (menu[i].code === 710) {
          a37.push(menu[i]);
        }
        if (menu[i].code === 711) {
          a38.push(menu[i]);
        }
        if (menu[i].code === 720) {
          a39.push(menu[i]);
        }
        if (menu[i].code === 721) {
          a40.push(menu[i]);
        }
        if (menu[i].code === 730) {
          a41.push(menu[i]);
        }
        if (menu[i].code === 731) {
          a42.push(menu[i]);
        }
      }
      res.render("student/mess-menu", {
        mob: a1,
        mobe: a2,
        mol: a3,
        mole: a4,
        mod: a5,
        mode: a6,
        tub: a7,
        tube: a8,
        tul: a9,
        tule: a10,
        tud: a11,
        tude: a12,
        web: a13,
        webe: a14,
        wel: a15,
        wele: a16,
        wed: a17,
        wede: a18,
        thb: a19,
        thbe: a20,
        thl: a21,
        thle: a22,
        thd: a23,
        thde: a24,
        frb: a25,
        frbe: a26,
        frl: a27,
        frle: a28,
        frd: a29,
        frde: a30,
        sab: a31,
        sabe: a32,
        sal: a33,
        sale: a34,
        sad: a35,
        sade: a36,
        sub: a37,
        sube: a38,
        sul: a39,
        sule: a40,
        sud: a41,
        sude: a42,
      });
    }
  } else {
    res.redirect("/login");
  }
});

module.exports = router;