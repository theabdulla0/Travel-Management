const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const authMiddleware = async (req, res, next) => {
  const token =
    req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded?._id).select(
      "-password -refreshToken",
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid access token" });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};

module.exports = authMiddleware;
