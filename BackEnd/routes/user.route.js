const express = require("express");
const {
  signup,
  login,
  getMe,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword,

} = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.get("/me", authMiddleware, getMe);

module.exports = router;
