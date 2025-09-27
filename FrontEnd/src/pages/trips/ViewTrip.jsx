import React, { useEffect, useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { FaCalendar, FaWallet } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";

function ViewTrip({ trip }) {
  const [expandedDay, setExpandedDay] = useState(null);

  useEffect(() => {
    console.log(
      "ViewTrip: trip prop received at",
      new Date().toLocaleString(),
      ":",
      trip
    );
  }, [trip]);

  const toggleDay = (day) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  // Check if trip data is invalid or missing
  if (!trip || trip.error) {
    return (
      <div className="p-6 max-w-5xl mx-auto space-y-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          No Trip Plan Available
        </h2>
        <p className="text-gray-600">
          {trip?.error ||
            "Create a new trip using the chatbot to view your itinerary here."}
        </p>
      </div>
    );
  }

  // Validate required fields
  const requiredFields = [
    "tripTitle",
    "startingPoint",
    "destination",
    "groupSize",
    "budgetCategory",
    "durationDays",
    "interests",
    "itinerary",
    "recommendations",
  ];
  const missingFields = requiredFields.filter((field) => !trip[field]);
  if (
    missingFields.length > 0 ||
    !Array.isArray(trip.itinerary) ||
    !trip.recommendations.hotels
  ) {
    console.error(
      "ViewTrip: Invalid trip data at",
      new Date().toLocaleString(),
      ":",
      {
        missingFields,
        itineraryIsArray: Array.isArray(trip.itinerary),
        hasRecommendations: !!trip.recommendations,
      }
    );
    return (
      <div className="p-6 max-w-5xl mx-auto space-y-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Invalid Trip Plan
        </h2>
        <p className="text-gray-600">
          The trip plan is missing required fields: {missingFields.join(", ")}{" "}
          or has invalid data. Please try generating the trip again.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-3">{trip.tripTitle}</h1>
        <p className="text-gray-600 flex justify-center flex-wrap gap-4 items-center text-lg">
          <span>
            <FaCalendar className="inline mr-1 text-green-600" />
            {trip.durationDays} days
          </span>
          <span>
            <FaPerson className="inline mr-1 text-green-600" />
            {trip.groupSize}
          </span>
          <span>
            <FaWallet className="inline mr-1 text-green-600" />
            {trip.budgetCategory} budget
          </span>
        </p>
      </div>

      {/* Trip Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-md text-gray-700">
        <div>
          <p>
            <strong>From:</strong> {trip.startingPoint}
          </p>
          <p>
            <strong>To:</strong> {trip.destination}
          </p>
          <p>
            <strong>Duration:</strong> {trip.durationDays} days
          </p>
        </div>
        <div>
          <p>
            <strong>Budget:</strong> {trip.budgetCategory}
          </p>
          <p>
            <strong>Group:</strong> {trip.groupSize}
          </p>
          <p>
            <strong>Interests:</strong> {trip.interests.join(", ")}
          </p>
        </div>
      </div>

      {/* Itinerary */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Itinerary</h2>
        <div className="relative">
          {/* Vertical timeline for md+ screens */}
          <div className="hidden md:block absolute left-5 top-0 h-full w-1 bg-green-600 rounded"></div>

          {trip.itinerary.map((day) => (
            <div
              key={day.day}
              className="relative mb-8 pl-0 md:pl-12 flex flex-col md:block"
            >
              {/* Timeline dot */}
              <div className="absolute md:left-2.5 top-2 w-5 h-5 bg-green-600 rounded-full border-2 border-white"></div>

              {/* Day Card */}
              <div className="border rounded-lg shadow-sm bg-white overflow-hidden mt-6 md:mt-0">
                <button
                  className="flex justify-between items-center w-full px-4 py-3 text-left font-semibold text-gray-800 hover:bg-gray-50 focus:outline-none"
                  onClick={() => toggleDay(day.day)}
                >
                  <span>
                    Day {day.day}: {day.title}
                  </span>
                  {expandedDay === day.day ? (
                    <HiChevronUp size={20} />
                  ) : (
                    <HiChevronDown size={20} />
                  )}
                </button>
                {expandedDay === day.day && (
                  <div className="px-6 py-4 text-gray-700 space-y-2 bg-gray-50">
                    <div className="space-y-1">
                      <strong>Activities:</strong>
                      <ul className="list-disc ml-5">
                        {day.activities.map((act, i) => (
                          <li key={i}>{act}</li>
                        ))}
                      </ul>
                    </div>
                    <p>
                      <strong>Hotel:</strong>{" "}
                      <span className="text-green-600">{day.hotel}</span>
                    </p>
                    <p>
                      <strong>Meals:</strong>{" "}
                      <span className="text-blue-600">
                        {day.meals.join(", ")}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white p-6 rounded-lg shadow-md space-y-3">
        <h2 className="text-2xl font-semibold text-gray-800">
          Recommendations
        </h2>
        <p>
          <strong>Hotels:</strong>{" "}
          <span className="text-green-600">
            {trip.recommendations.hotels.join(", ")}
          </span>
        </p>
        <p>
          <strong>Restaurants:</strong>{" "}
          <span className="text-orange-500">
            {trip.recommendations.restaurants.join(", ")}
          </span>
        </p>
        <p>
          <strong>Travel Tips:</strong>{" "}
          <span className="text-gray-700">
            {trip.recommendations.travelTips.join("; ")}
          </span>
        </p>
      </div>
    </div>
  );
}

export default ViewTrip;
