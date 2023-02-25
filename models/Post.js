const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    location: String,
    description: String,
    picture_path: String,
    user_picture_path: String,
    likes: { type: Map, of: Boolean,default:new Map() },

    comments: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
