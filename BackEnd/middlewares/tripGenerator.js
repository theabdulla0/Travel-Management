const axios = require("axios");

async function TripGen(plan) {
  const key = process.env.GROKIT_API_KEY;
  if (!key) throw new Error("Missing GROKIT_API_KEY in env");

  const prompt = `
You are an AI Trip Planner Agent.

User has already provided all required details:
${JSON.stringify(plan)}

Now your job is to generate a **complete trip plan** in **strict JSON format only**. 
No explanations, no markdown, no text outside the JSON object.

Schema to follow:

{
  "tripTitle": "string",
  "startingPoint": "string",
  "destination": "string",
  "groupSize": "Solo | Couple | Family | Friends",
  "budgetCategory": "Low | Medium | High",
  "durationDays": number,
  "interests": ["array", "of", "interests"],
  "itinerary": [
    {
      "day": number,
      "title": "string",
      "activities": ["activity1", "activity2"],
      "hotel": "string",
      "meals": ["breakfast", "lunch", "dinner"]
    }
  ],
  "recommendations": {
    "hotels": ["hotel1", "hotel2"],
    "restaurants": ["restaurant1", "restaurant2"],
    "travelTips": ["tip1", "tip2"]
  }
}

Rules:
- Always fill the itinerary with a day-by-day plan matching the trip duration.
- Suggest **realistic hotels, restaurants, and attractions** based on the destination.
- Keep text concise and usable in a UI.
- Never return text outside the JSON object.
`;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "x-ai/grok-4-fast:free",

        messages: [
          { role: "system", content: prompt },
          {
            role: "user",
            content: Array.isArray(plan) ? plan.join("\n") : plan,
          },
        ],
        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${key}`,
          "HTTP-Referer": process.env.URL || "http://localhost",
          "X-Title": "AI Travel Planner",
          "Content-Type": "application/json",
        },
      }
    );

    const text = (response.data.choices?.[0]?.message?.content || "").trim();
    console.log("AI raw response:", text);

    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error("AI response does not contain valid JSON");
        throw new Error("No valid JSON found in AI response");
      }
      console.log("Trip Gen Res:", JSON.parse(jsonMatch));
      return JSON.parse(jsonMatch);
    } catch {
      throw new Error("Failed to generate trip step" + text);
    }
  } catch (error) {
    console.error("TripGen Error:", error.response?.data || error.message);
    throw new Error("Failed to generate trip step");
  }
}

module.exports = { TripGen };
