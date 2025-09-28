const express = require("express");
const router = express.Router();
const { getJson } = require("serpapi");

router.get("/search-image", async (req, res) => {
  try {
    const { query } = req.body;
    const json = await getJson({
      engine: "google_images",
      q: query,
      hl: "en",
      gl: "us",
      api_key: process.env.SERPAPI,
    });

    res.json(json);
  } catch (err) {
    console.error("Error fetching image:", err);
    res.status(500).json({ error: "Failed to fetch image" });
  }
});

module.exports = router;
