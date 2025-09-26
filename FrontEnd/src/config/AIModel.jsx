export const generateItinerary = async (
  destination,
  days,
  budget,
  travelStyle
) => {
  const prompt = `
    Generate a travel itinerary in JSON format based on the user’s input:
    destination: ${destination}, number of days: ${days}, budget: ${budget}, travel style: ${travelStyle}.
    Include day-wise activities, hotels, restaurants, transportation, and additional tips.
    Only return JSON.
  `;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_APP_GEMINI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        temperature: 0.7,
        maxOutputTokens: 1000,
      }),
    }
  );

  const data = await response.json();
  const jsonOutput = JSON.parse(data.candidates[0].content);
  return jsonOutput;
};
