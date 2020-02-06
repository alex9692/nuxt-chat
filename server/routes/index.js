require("../db");
require("../utils/passport");
// require("../utils/socket");
const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
var cookieParser = require("cookie-parser");
const app = express();

const errorCtrl = require("../controllers/error");
const authRoutes = require("./auth");
const messageRoutes = require("./message");
const roomRoutes = require("./room");
const userRoutes = require("./user");

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());

app.use("/auth", authRoutes);
app.use("/message", messageRoutes);
app.use("/room", roomRoutes);
app.use("/user", userRoutes);

app.use(errorCtrl);

module.exports = {
  path: "api/v1",
  handler: app
};
