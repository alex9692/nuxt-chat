const User = require("../models/user");
const { errorHandler } = require("../utils/errorHandler");

exports.getMe = async (req, res, next) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);

    if (!user) {
      return next(errorHandler("User not found", "fail", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        token: req.userCookies,
        user
      }
    });
  } catch (error) {
    next(errorHandler(error.message));
  }
};

exports.getRoomUsers = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const users = await User.find({ rooms: roomId }).select(
      "-rooms -__v -createdAt -updatedAt -email"
    );
    res.status(200).json({
      status: "success",
      data: {
        users
      }
    });
  } catch (error) {
    next(errorHandler(error.message));
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select(
      "-rooms -__v -createdAt -updatedAt -email"
    );
    res.status(200).json({
      status: "success",
      data: {
        users
      }
    });
  } catch (error) {
    next(errorHandler(error.message));
  }
};

exports.updateUserInfo = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    for (let key in req.body) {
      user[key] = req.body[key];
    }
    const newUser = await user.save();
    res.status(200).json({
      status: "success",
      data: {
        user: newUser
      }
    });
  } catch (error) {
    next(errorHandler(error.message));
  }
};

