const express = require("express");
const router = express.Router({ mergeParams: true });

const messageCtrl = require("../controllers/message");
const { passport } = require("../utils/passport");

router
  .route("/")
  .get(
    passport.authenticate("jwt", { session: false }),
    messageCtrl.getRoomMessages
  )
  .post(
    passport.authenticate("jwt", { session: false }),
    messageCtrl.createMessage
  );

module.exports = router;
