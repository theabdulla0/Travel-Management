const express = require("express");
const router = express.Router();
const Trip = require("../models/trip.model");
const authMiddleware = require("../middlewares/auth.middleware");

// Save AI trip plan
router.post("/save-trip", authMiddleware, async (req, res) => {
  try {
    // console.log("req.user:", req.user);
    const { plan } = req.body;

    if (!plan) {
      return res.status(400).json({ message: "Trip details are required" });
    }
    console.log(plan);
    const newTrip = await Trip.create({
      tripDetails: plan,
      createdBy: req.user.id,
    });

    res.status(201).json({ message: "Trip saved successfully", trip: newTrip });
  } catch (err) {
    console.error("Error saving trip:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
