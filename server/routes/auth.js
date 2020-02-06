const express = require("express");
const router = express.Router();

const authCtrl = require("../controllers/auth");
const { passport } = require("../utils/passport");

router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);
router.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  authCtrl.logout
);

module.exports = router;
