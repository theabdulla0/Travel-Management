import React, { useEffect, useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { FaCalendar, FaWallet } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";

function ViewTrip({ trip }) {
  const [expandedDay, setExpandedDay] = useState(null);

  const toggleDay = (day) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

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
          or has invalid data.
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
            <strong>To:</strong>{" "}
            {`${trip.destination?.city}, ${trip.destination?.country}`}
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
          <div className="hidden md:block absolute left-5 top-0 h-full w-1 bg-green-600 rounded"></div>

          {trip.itinerary.map((day) => (
            <div
              key={day.day}
              className="relative mb-8 pl-0 md:pl-12 flex flex-col md:block"
            >
              <div className="absolute md:left-2.5 top-2 w-5 h-5 bg-green-600 rounded-full border-2 border-white"></div>

              <div className="border rounded-lg shadow-sm bg-white overflow-hidden mt-6 md:mt-0">
                <button
                  className="flex justify-between items-center w-full px-4 py-3 text-left font-semibold text-gray-800 hover:bg-gray-50"
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
                  <div className="px-6 py-4 text-gray-700 space-y-4 bg-gray-50">
                    {/* Activities */}
                    <div>
                      <strong>Activities:</strong>
                      <ul className="list-disc ml-5 space-y-2">
                        {day.activities.map((act, i) => (
                          <li key={i}>
                            <p className="font-medium">{act.name}</p>
                            <p className="text-sm text-gray-600">
                              {act.description}
                            </p>
                            {act.image && (
                              <img
                                src={act.image}
                                alt={act.name}
                                className="mt-1 w-40 h-24 object-cover rounded"
                              />
                            )}
                            {act.mapLink && (
                              <a
                                href={act.mapLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline text-sm"
                              >
                                View on Map
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Hotel */}
                    {day.hotel && (
                      <div>
                        <strong>Hotel:</strong>
                        <p className="text-green-600">{day.hotel.name}</p>
                        {day.hotel.image && (
                          <img
                            src={day.hotel.image}
                            alt={day.hotel.name}
                            className="mt-1 w-40 h-24 object-cover rounded"
                          />
                        )}
                        {day.hotel.mapLink && (
                          <a
                            href={day.hotel.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline text-sm"
                          >
                            View on Map
                          </a>
                        )}
                      </div>
                    )}

                    {/* Meals */}
                    {day.meals?.length > 0 && (
                      <div>
                        <strong>Meals:</strong>
                        <ul className="list-disc ml-5 space-y-2">
                          {day.meals.map((meal, i) => (
                            <li key={i}>
                              <p className="text-blue-600">{meal.name}</p>
                              {meal.image && (
                                <img
                                  src={meal.image}
                                  alt={meal.name}
                                  className="mt-1 w-32 h-20 object-cover rounded"
                                />
                              )}
                              {meal.mapLink && (
                                <a
                                  href={meal.mapLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 underline text-sm"
                                >
                                  View on Map
                                </a>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Recommendations
        </h2>
        <div>
          <strong>Hotels:</strong>
          <ul className="list-disc ml-5 space-y-2">
            {trip.recommendations.hotels.map((hotel, i) => (
              <li key={i}>
                <p className="text-green-600">{hotel.name}</p>
                {hotel.image && (
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="mt-1 w-32 h-20 object-cover rounded"
                  />
                )}
                {hotel.mapLink && (
                  <a
                    href={hotel.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline text-sm"
                  >
                    View on Map
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <strong>Restaurants:</strong>
          <ul className="list-disc ml-5 space-y-2">
            {trip.recommendations.restaurants.map((rest, i) => (
              <li key={i}>
                <p className="text-orange-500">{rest.name}</p>
                {rest.image && (
                  <img
                    src={rest.image}
                    alt={rest.name}
                    className="mt-1 w-32 h-20 object-cover rounded"
                  />
                )}
                {rest.mapLink && (
                  <a
                    href={rest.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline text-sm"
                  >
                    View on Map
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <strong>Travel Tips:</strong>
          <ul className="list-disc ml-5">
            {trip.recommendations.travelTips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ViewTrip;
