const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ApiResponse } = require("../utils/ApiResponse");
const sendMail = require("../utils/sendMail");
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
      return res
        .status(500)
        .json({ message: "Failed to registering the user" });
    }
    return res
      .status(201)
      .json(new ApiResponse(200, {}, "user Register Successfully"));
  } catch (error) {
    console.error(error);
    return res.json(
      new ApiResponse(500, { error: error.message }, "Server Error"),
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
  

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          "user Logged In successfully",
        ),
      );
  } catch (error) {
    console.error(error);
    return res.json(
      new ApiResponse(500, { error: error.message }, "Server Error"),
    );
  }
};

// Get Current User
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-password -refreshToken",
    );
    if (!user) return res.json(new ApiResponse(400, {}, "User not found"));

    return res.json(new ApiResponse(200, user, ""));
  } catch (error) {
    console.error(error);
    return res.json(
      new ApiResponse(500, { error: error.message }, "Server Error"),
    );
  }
};

//Refresh Token
const refreshAccessToken = async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken)
    return res.status(401).json({ message: "unauthorized request" });

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );

    const user = await User.findById(decodedToken._id);
    if (!user)
      return res.status(403).json({ message: "Invalid refresh token" });

    if (incomingRefreshToken !== user?.refreshToken) {
      return res.status(403).json({ message: "refresh token is expired" });
    }

    const { accessToken, NewRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", NewRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { user: loggedInUser, accessToken, refreshToken: NewRefreshToken },
          "access token refresh successfully",
        ),
      );
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
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
    console.error(error);
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
    await sendMail({
      to: email,
      subject: "Reset Your Password",
      html: `<p>Your OTP of Password reset is <b>${otp}</b>. I will expire in 5 minutes</p>`,
    });
    return res.json(new ApiResponse(200, {}, "otp send Successfully"));
  } catch (error) {
    return res.json(new ApiResponse(500, {}, { error: error.message }));
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.resetOtp !== otp || user.otpExpires < Date.now())
      return res.json(new ApiResponse(400, {}, { error: error.message }));
    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    await user.save();
    return res.json(new ApiResponse(200, {}, "otp verified Successfully"));
  } catch (error) {
    return res.json(new ApiResponse(500, {}, { error: error.message }));
  }
};

//  Reset Password
const resetPassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!email || !user.isOtpVerified) {
      return res.json(new ApiResponse(400, {}, "Otp verified required"));
    }
    const isOldPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if (!isOldPasswordCorrect) {
      return res.json(new ApiResponse(400, {}, "Old Password incorrect"));
    }

    user.password = newPassword;
    user.isOtpVerified = false;
    await user.save({ validateBeforeSave: false });

    return res.json(new ApiResponse(200, {}, "Password changed successfully"));
  } catch (error) {
    return res.json(new ApiResponse(500, {}, { error: error.message }));
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
