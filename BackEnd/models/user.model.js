const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    trips: [{ type: mongoose.Schema.Types.ObjectId, ref: "Trip" }],
    refreshToken: { type: String, default: null },
    resetOtp: { type: String, minlength: 4 },
    otpExpires: { type: Date },
    isOtpVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email, name: this.name },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN },
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });
};

module.exports = mongoose.model("User", userSchema);
