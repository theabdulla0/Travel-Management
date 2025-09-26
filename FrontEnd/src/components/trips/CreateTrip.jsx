import React, { useState, useEffect } from "react";
import LayoutCommon from "../common/LayoutCommon";
import { Input } from "../ui/input";
import {
  SelectBudgetOptions,
  SelectTravelersList,
} from "../../constants/options";
import { Button } from "../ui/button";
import { toast } from "sonner";

function CreateTrip() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedTravelStyle, setSelectedTravelStyle] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);

  // Debounce input
  useEffect(() => {
    const handler = setTimeout(
      () => setDebouncedQuery(destination.trim()),
      500
    );
    return () => clearTimeout(handler);
  }, [destination]);

  // Fetch city suggestions
  useEffect(() => {
    if (debouncedQuery.length < 3) return setSuggestions([]);

    const fetchCities = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${encodeURIComponent(
            debouncedQuery
          )}&limit=5`,
          {
            headers: {
              "x-rapidapi-key": import.meta.env.VITE_APP_GEODB_API_KEY,
              "x-rapidapi-host": import.meta.env.VITE_APP_GEODB_API_HOST,
            },
          }
        );

        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        const data = await res.json();
        setSuggestions(data.data || []);
      } catch (err) {
        console.error("Error fetching cities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [debouncedQuery]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!destination || !days || !selectedBudget || !selectedTravelStyle) {
      toast.error("Please fill all fields and make selections.");
      return;
    }

    const budget = SelectBudgetOptions.find(
      (b) => b.id === selectedBudget
    )?.title;
    const travelStyle = SelectTravelersList.find(
      (t) => t.id === selectedTravelStyle
    )?.title;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination, days, budget, travelStyle }),
      });
      if (!res.ok) throw new Error("Failed to fetch itinerary");
      const data = await res.json();
      setItinerary(data);
      toast.success("Itinerary generated successfully!");
    } catch (err) {
      console.error("Error fetching itinerary:", err);
      toast.error("Failed to generate itinerary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutCommon>
      <form
        onSubmit={handleSubmit}
        className="px-4 sm:px-6 md:px-16 lg:px-24 xl:px-40 2xl:px-60 mt-10 space-y-12"
      >
        {/* Header */}
        <div>
          <h2 className="font-extrabold text-3xl sm:text-4xl text-gray-800">
            Tell Us Your Travel Preferences 🏖️🏝️
          </h2>
          <p className="mt-2 text-gray-500 text-lg sm:text-xl">
            Provide some details about your trip preferences.
          </p>
        </div>

        {/* Destination & Days */}
        <div className="space-y-8">
          <div className="relative">
            <h2 className="text-xl font-semibold mb-2">Destination</h2>
            <Input
              placeholder="Eg. Paris, France"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full rounded-xl border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            {loading && (
              <p className="text-sm text-gray-400 mt-1">Loading...</p>
            )}
            {suggestions.length > 0 && (
              <ul className="absolute bg-white border border-gray-200 rounded-xl shadow-lg mt-1 w-full max-h-56 overflow-y-auto z-20">
                {suggestions.map((city) => (
                  <li
                    key={city.id}
                    onClick={() => {
                      setDestination(`${city.city}, ${city.country}`);
                      setSuggestions([]);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    {city.city}, {city.country}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Number of Days</h2>
            <Input
              placeholder="Ex. 3"
              type="number"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full rounded-xl border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
        </div>

        {/* Budget Options */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Budget</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {SelectBudgetOptions.map((opt) => (
              <div
                key={opt.id}
                onClick={() => setSelectedBudget(opt.id)}
                className={`relative rounded-2xl p-6 cursor-pointer shadow-md transition transform hover:scale-105 hover:shadow-xl bg-white ${
                  selectedBudget === opt.id
                    ? "border-2 border-blue-500 bg-blue-50"
                    : ""
                }`}
              >
                {selectedBudget === opt.id && (
                  <span className="absolute top-3 right-3 text-blue-600 text-xl">
                    ✅
                  </span>
                )}
                <h2 className="text-5xl mb-2">{opt.icon}</h2>
                <h2 className="text-lg font-semibold mb-1">{opt.title}</h2>
                <p className="text-sm text-gray-500">{opt.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Options */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Travel Style</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {SelectTravelersList.map((opt) => (
              <div
                key={opt.id}
                onClick={() => setSelectedTravelStyle(opt.id)}
                className={`relative rounded-2xl p-6 cursor-pointer shadow-md transition transform hover:scale-105 hover:shadow-xl bg-white ${
                  selectedTravelStyle === opt.id
                    ? "border-2 border-green-500 bg-green-50"
                    : ""
                }`}
              >
                {selectedTravelStyle === opt.id && (
                  <span className="absolute top-3 right-3 text-green-600 text-xl">
                    ✅
                  </span>
                )}
                <h2 className="text-5xl mb-2">{opt.icon}</h2>
                <h2 className="text-lg font-semibold mb-1">{opt.title}</h2>
                <h3 className="text-sm font-medium">{opt.people}</h3>
                <p className="text-sm text-gray-500 mt-1">{opt.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="my-8 flex justify-end">
          <Button type="submit" size="lg" disabled={loading}>
            {loading ? "Generating..." : "Submit Trip"}
          </Button>
        </div>
      </form>

      {/* Itinerary JSON Output */}
      {itinerary && (
        <div className="mt-10 p-6 bg-gray-50 border rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">
            Generated Itinerary (JSON)
          </h2>
          <pre className="text-sm overflow-x-auto">
            {JSON.stringify(itinerary, null, 2)}
          </pre>
        </div>
      )}
    </LayoutCommon>
  );
}

export default CreateTrip;
