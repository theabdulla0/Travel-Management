const express = require("express");
const router = express.Router();
const {
  SaveTrips,
  ViewAllUserTrips,
  generateAiPlanner,
} = require("../controllers/trip.controller");
const authMiddleware = require("../middlewares/auth.middleware");
// Save AI trip plan
router.post("/save-trip", authMiddleware, SaveTrips);
router.get("/", authMiddleware, ViewAllUserTrips);
router.post("/ai", authMiddleware, generateAiPlanner);

module.exports = router;
