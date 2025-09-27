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
      .json(new ApiResponse(200, createUser, "user Register Successfully"));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
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

    const options = {
      httpOnly: true,
      secure: false,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { user: loggedInUser, accessToken, refreshToken },
          "user Logged In successfully",
        ),
      );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Current User
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-password -refreshToken",
    );
    console.log("getMe", user);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(new ApiResponse(200, user, "current user fetched"));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
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
    const options = {
      httpOnly: true,
      secure: true,
    };

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
    res.status(403).json({ message: "Invalid or expired token" });
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

    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "user logged out successfully"));
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

//  Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    const resetLink = `${process.env.URL}/auth/reset-password?token=${resetToken}`;

    await sendMail({
      to: email,
      subject: "Password Reset",
      text: `Click here to reset: ${resetLink}`,
      html: `<h4>Password Reset</h4><p><a href="${resetLink}">Reset Password</a></p>`,
    });

    return res.json({ message: "Reset link sent to email" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//  Reset Password
const resetPassword = async (req, res) => {
  try {
    // const { token } = req.query;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id);
    const isOldPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if (!isOldPasswordCorrect) {
      return res.status(404).json({ message: "Old Password incorrect" });
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res.json(new ApiResponse(200, {}, "Password changed successfully"));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signup,
  login,
  getMe,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetPassword,
};
