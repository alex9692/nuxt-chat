const slugify = require("slugify");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    roomName: {
      type: String,
      required: true,
      minlength: [4, "roomName length should be atleast 4 characters"]
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    },
    slug: {
      type: String,
      unique: true,
      sparse: true
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  { timestamps: true }
);

roomSchema.pre("save", function(next) {
  this.slug = slugify(this.roomName, { lower: true });
  next();
});

module.exports = mongoose.model("Room", roomSchema);
