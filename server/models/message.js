const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    message: {
      type: String,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
