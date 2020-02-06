const User = require("../models/user");
const { errorHandler } = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        user
      }
    });
  } catch (error) {
    next(errorHandler(error.message));
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.matchingPasswords(user.password, password))) {
      return next(errorHandler("Incorrect email or password", "fail", 400));
    }

    const token = jwt.sign(
      {
        id: user.id
      },
      "secret",
      { expiresIn: "3600s" }
    );
    const cookieOptions = {
      expires: new Date(Date.now() + 60 * 60 * 1000),
      httpOnly: true,
      secure: req.secure || req.headers["x-forwarded-proto"] === "https"
    };
    res.cookie("jwt", token, cookieOptions);

    user.password = undefined;
    res.status(200).json({
      status: "success",
      data: {
        token,
        user
      }
    });
  } catch (error) {
    next(errorHandler(error.message));
  }
};

exports.logout = (req, res, next) => {
  res.clearCookie("jwt");
  res.status(200).json({
    status: "success",
    message: "logout successfull"
  });
};
