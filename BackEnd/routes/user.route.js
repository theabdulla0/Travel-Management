const express = require("express");
const {
  signup,
  login,
  getMe,
  refreshAccessToken,
  logout,
  sendOTP,
  verifyOTP,
  resetPassword,
} = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", authMiddleware, logout);

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);

router.get("/me", authMiddleware, getMe);

module.exports = router;
