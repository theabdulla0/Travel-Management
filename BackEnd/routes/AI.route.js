const express = require("express");
const router = express.Router();
const { generateTripItinerary } = require("../utils/AIGenraret");

router.post("/generate", async (req, res) => {
  const { destination, days, budget, travelStyle } = req.body;
  if (!destination || !days || !budget || !travelStyle) {
    return res.status(400).json({
      error:
        "Missing one or more required fields: destination, days, budget, travelStyle",
    });
  }
  try {
    const itinerary = await generateTripItinerary({
      destination,
      days,
      budget,
      travelStyle,
    });
    res.status(200).json(itinerary);
  } catch (err) {
    console.error("AI Generation Error:", err);

    res.status(500).json({ error: "Failed to generate trip itinerary." });
  }
});
module.exports = router;
