const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    google_id: { type: String },
    first_name: { type: String, required: true, min: 2, max: 50 },
    last_name: { type: String, required: true, min: 2, max: 50 },
    email: { type: String, required: true, max: 50, unique: true },
    password: { type: String, min: 5 },
    picture_path: { type: String, default: "" },
    friends: { type: Array, default: [] },
    location: String,
    occupation: String,
    viewed_profile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);