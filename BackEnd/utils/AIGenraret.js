// const { GoogleGenAI } = require("@google/genai");

// const genAI = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
//   //   project: process.env.GEMINI_PROJECT_ID,
// });

// async function generateTripItinerary({
//   destination,
//   days,
//   budget,
//   travelStyle,
// }) {
//   if (!destination || !days || !budget || !travelStyle) {
//     throw new Error("Missing required trip fields.");
//   }

//   const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash-latest",
//   });

//   const prompt = `
// Generate a detailed travel itinerary for a ${days}-day trip to ${destination}.
// Budget: ${budget}, Travel style: ${travelStyle}.

// Output a single JSON object ONLY with this schema:
// {
//   "trip_name": "string",
//   "itinerary": [
//     {
//       "day": "number",
//       "theme": "string",
//       "schedule": [
//         { "time": "string", "activity": "string", "description": "string" }
//       ]
//     }
//   ],
//   "suggested_hotels": [
//     { "name": "string", "address": "string", "rating": "number", "price_range": "string" }
//   ],
//   "images": [
//     { "type": "hotel|attraction", "url": "string" }
//   ]
// }
// No extra text, explanations, or markdown outside JSON.
// `;

//   const generationConfig = {
//     response_mime_type: "application/json",
//   };

//   try {
//     const result = await model.generateContent({
//       contents: [{ role: "user", parts: [{ text: prompt }] }],
//       generationConfig,
//     });

//     const jsonText = result.response.text?.() || "{}";
//     const itinerary = JSON.parse(jsonText);
//     return itinerary;
//   } catch (err) {
//     console.error("AI generation error:", err);
//     throw new Error("Failed to generate itinerary from AI.");
//   }
// }

// module.exports = { generateTripItinerary };
