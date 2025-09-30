const { getJson } = require("serpapi");

const fetchImage = async (query) => {
  return new Promise((resolve) => {
    getJson(
      {
        q: query,
        engine: "google_images", // folder-scoped engine (image search)
        ijn: "0", // page index (0 = first page)
        api_key: process.env.SERPAPI_KEY,
      },
      (json) => {
        const results = json?.images_results || [];
        if (results.length > 0) {
          // Prefer original, fallback to thumbnail
          resolve(results[0].original || results[0].thumbnail || null);
        } else {
          console.warn("No images found for:", query);
          resolve(null);
        }
      },
    );
  });
};

module.exports = fetchImage;
