const Trip = require("../models/trip.model");
const User = require("../models/user.model");
const { ApiResponse } = require("../utils/ApiResponse");
const fetchImage = require("../utils/ImageSearchSerpAPI");

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const generateAiPlanner = async (req, res) => {
  try {
    const plan = req.body;
    if (!plan)
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Plan not provided"));

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
      "destination": {
        "city": "string",
        "country": "string"
      },
      "groupSize": "Solo | Couple | Family | Friends",
      "budgetCategory": "Low | Medium | High",
      "durationDays": number,
      "interests": ["array", "of", "interests"],
      "itinerary": [
        {
          "day": number,
          "title": "string",
          "activities": [
            {
              "name": "string",
              "description": "string",
              "mapLink": "https://www.google.com/maps/search/?api=1&query=<PLACE_NAME>,<CITY>,<COUNTRY>",
      
            }
          ],
          "hotel": {
            "name": "string",
            "mapLink": "https://www.google.com/maps/search/?api=1&query=<HOTEL_NAME>,<CITY>,<COUNTRY>",
            
          },
          "meals": [
            {
              "name": "string",
              "mapLink": "https://www.google.com/maps/search/?api=1&query=<RESTAURANT_NAME>,<CITY>,<COUNTRY>",
              
            }
          ]
        }
      ],
      "recommendations": {
        "hotels": [
          {
            "name": "string",
            "mapLink": "https://www.google.com/maps/search/?api=1&query=<HOTEL_NAME>,<CITY>,<COUNTRY>",
            
          }
        ],
        "restaurants": [
          {
            "name": "string",
            "mapLink": "https://www.google.com/maps/search/?api=1&query=<RESTAURANT_NAME>,<CITY>,<COUNTRY>",
            
          }
        ],
        "travelTips": ["tip1", "tip2"]
      }
    }

    Rules:
    - Always include both "city" and "country" in the destination object.
    - Always append <CITY>,<COUNTRY> in map links so Google Maps is precise.
    - Replace placeholders with real names of hotels, attractions, and restaurants.
    - Always generate a day-by-day itinerary matching durationDays.
    - Keep text short and UI-friendly.
    - Do not include anything outside the JSON object.
`;
    // --- Call Gemini ---
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    let text = response?.text || "";
    const cleaned = text.replace(/```json\s*|\s*```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      return res
        .status(500)
        .json(new ApiResponse(500, null, "AI returned invalid JSON"));
    }

    const { itinerary = [], recommendations = {}, destination = {} } = parsed;
    const { hotels: recHotels = [], restaurants: recRestaurants = [] } =
      recommendations;

    // --- Image fetching promises generator ---
    const imagePromises = [];

    itinerary.forEach((day) => {
      // Add activity images
      day.activities?.forEach((act) => {
        imagePromises.push(
          fetchImage(
            `${act.name}, ${destination.city}, ${destination.country}`,
          ).then((img) => {
            act.image = img;
          }),
        );
      });

      // Add hotel image
      if (day.hotel?.name) {
        imagePromises.push(
          fetchImage(
            `${day.hotel.name}, ${destination.city}, ${destination.country}`,
          ).then((img) => {
            day.hotel.image = img;
          }),
        );
      }

      // Add meal images
      day.meals?.forEach((meal) => {
        imagePromises.push(
          fetchImage(
            `${meal.name}, ${destination.city}, ${destination.country}`,
          ).then((img) => {
            meal.image = img;
          }),
        );
      });
    });

    // Recommendations images
    recHotels.forEach((hotel) => {
      imagePromises.push(
        fetchImage(
          `${hotel.name}, ${destination.city}, ${destination.country}`,
        ).then((img) => {
          hotel.image = img;
        }),
      );
    });
    recRestaurants.forEach((restaurant) => {
      imagePromises.push(
        fetchImage(
          `${restaurant.name}, ${destination.city}, ${destination.country}`,
        ).then((img) => {
          restaurant.image = img;
        }),
      );
    });

    // --- Await all images in parallel ---
    await Promise.all(imagePromises);

    res.json(new ApiResponse(200, { plan: parsed }));
  } catch (error) {
    res.json(new ApiResponse(500, null, error.message));
  }
};

const SaveTrips = async (req, res) => {
  try {
    const { plan } = req.body;

    if (!plan) {
      return res.status(400).json({ message: "Trip details are required" });
    }
    const newTrip = await Trip.create({
      tripDetails: plan,
      createdBy: req.user._id,
    });

    const user = await User.findById(req.user._id);
    user.trips.push(newTrip._id);
    await user.save();

    return res.json(
      new ApiResponse(299, {
        message: "Trip saved successfully",
        trip: newTrip,
      }),
    );
  } catch (error) {
    return res.json(
      new ApiResponse(500, { error: error.message }, "Server Error"),
    );
  }
};

const ViewAllUserTrips = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const trips = await Trip.find({ createdBy: userId });

    if (!trips || trips.length === 0) {
      return res
        .status(404)
        .json(new ApiResponse(404, [], "No trips found", false));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, trips, "Trips fetched successfully", true));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, error.message || "Server Error", false));
  }
};

module.exports = { ViewAllUserTrips, SaveTrips, generateAiPlanner };
