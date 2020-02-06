const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: [5, "username length atleast should be 5 characters"]
    },
    name: {
      type: String,
      required: true,
      minlength: [5, "name length atleast should be 5 characters"]
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "password length atleast should be 8 characters"],
      select: false
    },
    avatar: {
      type: String,
      default: "https://image.flaticon.com/icons/svg/747/747376.svg"
    },
    rooms: [
      {
        type: Schema.Types.ObjectId,
        ref: "Room"
      }
    ]
  },
  { timestamps: true }
);

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.matchingPasswords = async function(
  userPassword,
  inputPassword
) {
  return await bcrypt.compare(inputPassword, userPassword);
};

module.exports = mongoose.model("User", userSchema);
