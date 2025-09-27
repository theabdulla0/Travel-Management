const express = require("express");
const router = express.Router();
const { TripGen } = require("../middlewares/tripGenerator");

router.post("/ai-model", async (req, res) => {
  try {
    const { plan } = req.body;

    if (!plan) {
      return res.status(400).json({ error: "Missing 'plan' in request body" });
    }

    console.log("Received plan from frontend:", plan);

    const result = await TripGen(plan);

    console.log("AI response:", result);

    res.json(result);
  } catch (error) {
    console.error("Error in /ai-model route:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

module.exports = router;
