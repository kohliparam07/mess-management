// require our packages
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const ejs = require("ejs");

//require routes
const authRoute = require("./routes/auth");
const homeRoutes = require("./routes/home");
const studentRebateRoutes = require("./routes/studentRebate");
const managerRebateRoutes = require("./routes/managerRebate");
const studentExtrasRoutes = require("./routes/studentExtras");
const managerExtrasRoutes = require("./routes/managerExtras");
const studentOrdersRoutes = require("./routes/studentOrders");
const signRoutes = require("./routes/sign");
const studentMenuRoute = require("./routes/studentMenu");
const managerMenuGetRoute = require("./routes/managerMenuGet");
const managerMenuPostRoute = require("./routes/managerMenuPost");
const studentMessBillRoute = require("./routes/studentMessBill");
const studentComplainRoute = require("./routes/studentComplain");
const managerOrdersRoute = require("./routes/managerOrders");
const managerComplaintsRoute = require("./routes/managerComplaints");
const managerAccessAccountRoute = require("./routes/managerAccessAccount");

// setup application
const app = express();

//setup view engine EJS , body-parser and express-static
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//setup session
app.use(
  session({
    secret: 'your-secret-string',
    resave: false,
    saveUninitialized: false,
  })
);
app.use((req, res, next) => {
  if (!req.session.currentRollNumber) {
    req.session.currentRollNumber = '';
  }
  if (!req.session.currentDues) {
    req.session.currentDues = '0';
  }
  if (!req.session.currentExtras) {
    req.session.currentExtras = '0';
  }
  next();
});

// initialize passport
app.use(passport.initialize());

//use passport to deal with session
app.use(passport.session());

// Connect to database
mongoose
  .connect("mongodb+srv://singhparambir07:HLEyQDFtKsDTIZig@cluster0.opolmxy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

// use routes
app.use("/", authRoute);
app.use("/", homeRoutes);
app.use("/", studentRebateRoutes);
app.use("/", managerRebateRoutes);
app.use("/", studentExtrasRoutes);
app.use("/", managerExtrasRoutes);
app.use("/", studentOrdersRoutes);
app.use("/", signRoutes);
app.use("/", studentMenuRoute);
app.use("/", managerMenuGetRoute);
app.use("/", managerMenuPostRoute);
app.use("/", studentMessBillRoute);
app.use("/", studentComplainRoute);
app.use("/", managerOrdersRoute);
app.use("/", managerComplaintsRoute);
app.use("/", managerAccessAccountRoute);

// Start the server
app.listen(3000, () => console.log("Server is running"));
