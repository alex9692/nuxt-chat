const Room = require("../models/room");
const User = require("../models/user");
const { errorHandler } = require("../utils/errorHandler");

exports.setUserId = (req, res, next) => {
  req.params.userId = req.user.id;
  next();
};

exports.getAllRooms = async (req, res, next) => {
  try {
    let filter = {};
    if (req.params.userId) {
      filter = { creator: req.params.userId };
    }
    const select = "-__v -createdAt -updatedAt -_id -email";
    const rooms = await Room.find(filter)
      .populate({ path: "creator", select: select })
      .populate({ path: "users", select: select });

    res.status(200).json({
      status: "success",
      results: rooms.length,
      data: {
        rooms
      }
    });
  } catch (error) {
    next(errorHandler(error.message));
  }
};

exports.getRoomById = async (req, res, next) => {
  try {
    const select = "-__v -createdAt -updatedAt -_id -email";
    const id = req.params.id;
    const room = await Room.findById(id)
      .populate({ path: "creator", select: select })
      .populate({ path: "users", select: select });

    if (!room) {
      return next(errorHandler("Room not found", "fail", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        room
      }
    });
  } catch (error) {
    next(errorHandler(error.message));
  }
};

exports.createRoom = async (req, res, next) => {
  try {
    if (!req.body.creator) {
      req.body.creator = req.user.id;
    }
    req.body.users = [req.body.creator];
    const room = await Room.create(req.body);

    await User.findByIdAndUpdate(
      id,
      { $addToSet: { rooms: room.id } },
      { runValidators: true }
    );

    res.status(200).json({
      status: "success",
      data: {
        room
      }
    });
  } catch (error) {
    next(errorHandler(error.message));
  }
};

exports.addUsers = async (req, res, next) => {
  try {
    const id = req.user.id;
    const slug = req.body.slug;
    const room = await Room.findOneAndUpdate(
      { slug: slug },
      { $addToSet: { users: id } },
      { new: true, runValidators: true }
    );
    if (!room) {
      return next(errorHandler("Room not found", "fail", 404));
    }

    await User.findByIdAndUpdate(
      id,
      { $addToSet: { rooms: room.id } },
      { runValidators: true }
    );

    res.status(200).json({
      status: "success",
      data: {
        room
      }
    });
  } catch (error) {
    next(errorHandler(error.message));
  }
};

exports.updateUserRoom = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const { id } = req.user;
    console.log(roomId, id);
    const room = await Room.findOne({
      $and: [{ _id: roomId }, { creator: id }]
    });
    for (let key in req.body) {
      room[key] = req.body[key];
    }
    const newRoom = await room.save();
    res.status(200).json({
      status: "success",
      data: {
        room: newRoom
      }
    });
  } catch (error) {
    next(errorHandler(error.message));
  }
};
