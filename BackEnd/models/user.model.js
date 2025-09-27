const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  phone: {
    type: String,
    trim: true,
    match: [/^\+?[0-9]{7,15}$/, "Please enter a valid phone number"],
  },
  address: { type: String, trim: true, maxLength: 200 },
  city: { type: String, trim: true, maxLength: 50 },
  state: { type: String, trim: true, maxLength: 50 },
  country: { type: String, trim: true, maxLength: 50 },
  pinCode: {
    type: String,
    trim: true,
    match: [/^[0-9]{4,10}$/, "Please enter a valid pinCode"],
  },
  bio: { type: String, trim: true, maxLength: 500 },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
      index: true,
    },
    password: { type: String, minlength: 6 },
    googleId: { type: String, default: null },
    avatar: { type: String, default: "" },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    profile: { type: profileSchema, default: () => ({}) },

    refreshToken: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
