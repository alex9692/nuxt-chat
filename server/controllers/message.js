const Message = require("../models/message");
const { errorHandler } = require("../utils/errorHandler");

exports.createMessage = async (req, res, next) => {
  try {
    if (!req.body.user) {
      req.body.user = req.user.id;
    }
    if (!req.body.roomId) {
      req.body.room = req.params.roomId;
    }
    let message = await Message.create(req.body);
    message = await message
      .populate({
        path: "user",
        select: "-__v -email -createdAt -updatedAt"
      })
      .populate({
        path: "room",
        select: "-__v -email -createdAt -updatedAt -users -creator"
      })
      .execPopulate();
    res.status(201).json({
      status: "success",
      data: {
        message
      }
    });
  } catch (error) {
    next(errorHandler(error.message));
  }
};

exports.getRoomMessages = async (req, res, next) => {
  try {
    const id = req.params.roomId;

    const messages = await Message.find({ room: id })
      .populate({
        path: "user",
        select: "-__v -email -createdAt -updatedAt"
      })
      .populate({
        path: "room",
        select: "-__v -email -createdAt -updatedAt -users -creator"
      });
    res.status(200).json({
      status: "success",
      results: messages.length,
      data: {
        messages
      }
    });
  } catch (error) {
    next(errorHandler(error.message));
  }
};
