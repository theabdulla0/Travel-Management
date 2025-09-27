const express = require("express");
const router = express.Router();
const Trip = require("../models/trip.model");
const authMiddleware = require("../middlewares/auth.middleware");

// Save AI trip plan
router.post("/save-trip", authMiddleware, async (req, res) => {
  try {
    const { plan } = req.body;

    if (!plan) {
      return res.status(400).json({ message: "Trip details are required" });
    }
    console.log("Save trip before", plan);
    const newTrip = await Trip.create({
      tripDetails: JSON.stringify(plan),
      createdBy: req.user.id,
    });
    console.log("Save trip before", newTrip);

    res.status(201).json({ message: "Trip saved successfully", trip: newTrip });
  } catch (err) {
    console.error("Error saving trip:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
