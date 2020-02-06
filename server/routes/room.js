const express = require("express");
const router = express.Router();

const { passport } = require("../utils/passport");
const messageRoutes = require("./message");
const userRoutes = require("./user");
const roomCtrl = require("../controllers/room");

router.use("/:roomId/message", messageRoutes);
router.use("/:roomId/user", userRoutes);

router
  .route("/")
  .get(passport.authenticate("jwt", { session: false }), roomCtrl.getAllRooms)
  .post(passport.authenticate("jwt", { session: false }), roomCtrl.createRoom);

router.get(
  "/myRooms",
  passport.authenticate("jwt", { session: false }),
  roomCtrl.setUserId,
  roomCtrl.getAllRooms
);

router.patch(
  "/addUsers",
  passport.authenticate("jwt", { session: false }),
  roomCtrl.addUsers
);

router
  .route("/:id")
  .get(passport.authenticate("jwt", { session: false }), roomCtrl.getRoomById);

module.exports = router;
