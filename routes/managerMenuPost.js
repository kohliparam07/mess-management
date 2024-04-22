router = require("express").Router();
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Item = require("../models/Item");

router.post("/manager/messMenu/add", async (req, res) => {
  const item = new Item({
    name: req.body.name.trim().replace(/\s+/g, " "),
    code: req.body.code,
  });
  let flag = 0;
  try {
    function isWhitespaceString(str) {
      return /^\s*$/.test(str);
    }
    if (!isWhitespaceString(req.body.name)) {
      try {
        const Code = parseInt(req.body.code);
        const result = await Item.updateOne(
          { name: req.body.name.trim().replace(/\s+/g, " "), code: Code },
          { code: Code - 2 }
        );

        if (Code % 10 === 0) {
          const result2 = await Item.updateOne(
            { name: req.body.name.trim().replace(/\s+/g, " "), code: Code + 1 },
            { code: Code - 1 }
          );

          if (result.modifiedCount === 0 && result2.modifiedCount === 0) {
            await item.save();
            flag = 1;
            console.log("no copy in regular and extras");
          } else {
            await Item.updateOne(
              {
                name: req.body.name.trim().replace(/\s+/g, " "),
                code: Code - 1,
              },
              { code: Code + 1 }
            );
            await Item.updateOne(
              {
                name: req.body.name.trim().replace(/\s+/g, " "),
                code: Code - 2,
              },
              { code: Code }
            );
          }
          if (result.modifiedCount === 1) {
            console.log("regular copy exists");
          }
          if (result2.modifiedCount === 1) {
            console.log("extra copy exists");
          }
        } else if (Code % 10 === 1) {
          const result2 = await Item.updateOne(
            { name: req.body.name.trim().replace(/\s+/g, " "), code: Code - 1 },
            { code: Code - 3 }
          );
          if (result.modifiedCount === 0 && result2.modifiedCount === 0) {
            await item.save();
            flag = 1;
            console.log("no copy in regular and extras");
          } else {
            await Item.updateOne(
              {
                name: req.body.name.trim().replace(/\s+/g, " "),
                code: Code - 3,
              },
              { code: Code - 1 }
            );
            await Item.updateOne(
              {
                name: req.body.name.trim().replace(/\s+/g, " "),
                code: Code - 2,
              },
              { code: Code }
            );
          }

          if (result2.modifiedCount === 1) {
            console.log("regular copy exists");
          }
          if (result.modifiedCount === 1) {
            console.log("extra copy exists");
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
  res.redirect("/manager/messMenu?flag=" + flag);
});

router.post("/manager/messMenu/remove", async (req, res) => {
  let flag = 2;
  await Item.findByIdAndRemove(req.body.button);
  res.redirect("/manager/messMenu?flag=" + flag);
});

module.exports = router;
