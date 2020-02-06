const express = require("express");
const router = express.Router({ mergeParams: true });

const userCtrl = require("../controllers/user");
const { passport } = require("../utils/passport");

router.get(
  "/getMe",
  passport.authenticate("jwt", { session: false }),
  userCtrl.getMe
);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  userCtrl.getRoomUsers
);
router.get(
  "/allUsers",
  passport.authenticate("jwt", { session: false }),
  userCtrl.getAllUsers
);
module.exports = router;
