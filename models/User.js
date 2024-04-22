//require mongoose, passport-local-mongoose
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// Create User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  username: String,
  password: String,
  extrasCost: {
    type: Number,
    min: 0,
  },
  startingDate:{
    type:String,
    required:true
  },
  endingDate:{
    type:String,
    required:true
  },
  rebateStatus:{
    type:String,
    required:true
  },
  dues: {
    type: Number,
    min: 0,
  }
});

//hash password using passport-local-mongoose plugin
userSchema.plugin(passportLocalMongoose);

//export User Model
const Model = mongoose.model("User", userSchema);
Model.init();
module.exports = Model;
