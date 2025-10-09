const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ApiResponse } = require("../utils/ApiResponse");
const { sendOtpMail } = require("../utils/sendMail");
// const { OAuth2Client } = require("google-auth-library");

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    return new Error("Token generation failed");
  }
};

const options = {
  httpOnly: true,
  secure: false,
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

//  Signup
const signup = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const user = await User.create({
      name,
      email,
      password,
      profile: { phone },
    });

    const createUser = await User.findById(user._id).select("_id name email");

    if (!createUser) {
      return res.json(
        new ApiResponse(
          400,
          {},
          { message: "Failed to registering the user" },
          false,
        ),
      );
    }
    return res
      .status(201)
      .json(new ApiResponse(200, {}, "user Register Successfully", true));
  } catch (error) {
    return res.json(
      new ApiResponse(500, { error: error.message }, "Server Error", false),
    );
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid credentials" });

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id,
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken",
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { loggedInUser, accessToken, refreshToken },
          "user Logged In successfully",
          true,
        ),
      );
  } catch (error) {
    return res.json(
      new ApiResponse(500, { error: error.message }, "Server Error", false),
    );
  }
};

// Get Current User
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-password -refreshToken",
    );
    if (!user)
      return res.json(new ApiResponse(400, {}, "User not found", false));

    return res.json(new ApiResponse(200, user, "", true));
  } catch (error) {
    return res.json(
      new ApiResponse(500, { error: error.message }, "Server Error", false),
    );
  }
};

//Refresh Token
const refreshAccessToken = async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    return res.status(401).json({ message: "unauthorized request" });
  }

  try {
    const decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );
    const user = await User.findById(decoded._id);

    if (!user)
      return res.status(403).json({ message: "Invalid refresh token" });
    if (incomingRefreshToken !== user.refreshToken) {
      return res.status(403).json({ message: "Refresh token expired/invalid" });
    }

    // generate new tokens
    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    // Save new refresh in DB
    user.refreshToken = newRefreshToken;
    await user.save();

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json({
        success: true,
        user: { _id: user._id, email: user.email },
        accessToken,
      });
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token" });
  }
};

//Logout
const logout = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          refreshToken: undefined,
        },
      },
      { new: true },
    );

    res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json(new ApiResponse(200, {}, "user logged out successfully"));
  } catch (error) {
    return res.json(
      new ApiResponse(500, { error: error.message }, "Server Error"),
    );
  }
};

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;
    await user.save();
    await sendOtpMail(email, otp);

    return res.json(new ApiResponse(200, {}, "otp send Successfully"));
  } catch (error) {
    return res.json(new ApiResponse(500, {}, { error: error.message }));
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json(new ApiResponse(404, {}, "User not found"));
    }

    if (user.resetOtp !== otp) {
      return res.status(400).json(new ApiResponse(400, {}, "Invalid OTP"));
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json(new ApiResponse(400, {}, "OTP has expired"));
    }

    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return res.json(new ApiResponse(200, {}, "OTP verified successfully"));
  } catch (error) {
    // Fixed: Pass error message as string, not object
    return res
      .status(500)
      .json(new ApiResponse(500, {}, error.message || "Failed to verify OTP"));
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { email, oldPassword, password } = req.body; // Changed newPassword to password to match frontend

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json(new ApiResponse(404, {}, "User not found"));
    }

    if (!user.isOtpVerified) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "OTP verification required"));
    }

    const isOldPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if (!isOldPasswordCorrect) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Old password is incorrect"));
    }

    user.password = password; // Changed from newPassword to password
    user.isOtpVerified = false;
    await user.save({ validateBeforeSave: false });

    return res.json(new ApiResponse(200, {}, "Password changed successfully"));
  } catch (error) {
    // Fixed: Pass error message as string, not object
    return res
      .status(500)
      .json(
        new ApiResponse(500, {}, error.message || "Failed to reset password"),
      );
  }
};

module.exports = {
  signup,
  login,
  getMe,
  refreshAccessToken,
  logout,
  sendOTP,
  verifyOTP,
  resetPassword,
};
