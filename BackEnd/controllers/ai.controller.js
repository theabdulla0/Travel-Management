const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const generateAiPlanner = async (req, res) => {
  try {
    const plan = req.body;
    if (!plan) return res.status(404).json({ message: "Plan not found", plan });
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
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    
    let text = response.text;

    const cleaned = text.replace(/```json\s*|\s*```/g, "").trim();
    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      console.error("JSON parse failed. Raw:", cleaned);
      return res
        .status(500)
        .json({ message: "Invalid JSON from AI", raw: cleaned });
    }

    return res.status(200).json(parsed);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "failed to generate", error: error.message });
  }
};

module.exports = { generateAiPlanner };
