import React, { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { FaCalendar, FaWallet } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";

function SafeImage({ src, alt, className }) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-200 text-gray-500 text-xs rounded ${className}`}
      >
        No Image Available
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} object-cover rounded`}
      onError={() => setError(true)}
    />
  );
}

function ViewTrip({ trip }) {
  const [expandedDay, setExpandedDay] = useState(null);

  // Normalize plan (support DB doc or raw plan)
  const plan = trip?.tripDetails?.plan || trip?.plan || null;

  if (!plan) {
    return (
      <div className="p-6 max-w-5xl mx-auto space-y-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          No Trip Plan Available
        </h2>
        <p className="text-gray-600">
          Create a new trip using the chatbot to view your itinerary here.
        </p>
      </div>
    );
  }

  const toggleDay = (day) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-3">{plan.tripTitle}</h1>
        <p className="text-gray-600 flex justify-center flex-wrap gap-4 items-center text-lg">
          <span>
            <FaCalendar className="inline mr-1 text-neutral-900" />
            {plan.durationDays} days
          </span>
          <span>
            <FaPerson className="inline mr-1 text-neutral-900" />
            {plan.groupSize}
          </span>
          <span>
            <FaWallet className="inline mr-1 text-neutral-900" />
            {plan.budgetCategory} budget
          </span>
        </p>
      </div>

      {/* Trip Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-md text-gray-700">
        <div>
          <p>
            <strong>From:</strong> {plan.startingPoint}
          </p>
          <p>
            <strong>To:</strong> {plan.destination?.city},{" "}
            {plan.destination?.country}
          </p>
          <p>
            <strong>Duration:</strong> {plan.durationDays} days
          </p>
        </div>
        <div>
          <p>
            <strong>Budget:</strong> {plan.budgetCategory}
          </p>
          <p>
            <strong>Group:</strong> {plan.groupSize}
          </p>
          {plan.interests && (
            <p>
              <strong>Interests:</strong> {plan.interests.join(", ")}
            </p>
          )}
        </div>
      </div>

      {/* Itinerary */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Itinerary</h2>
        <div className="relative">
          <div className="hidden md:block absolute left-5 top-0 h-full w-1 bg-neutral-900 rounded"></div>
          {plan.itinerary?.map((day) => (
            <div
              key={day.day}
              className="relative mb-8 pl-0 md:pl-12 flex flex-col md:block"
            >
              <div className="absolute md:left-2.5 top-2 w-5 h-5 bg-neutral-900 rounded-full border-2 border-white"></div>
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
                    {day.activities?.length > 0 && (
                      <div>
                        <strong>Activities:</strong>
                        <ul className="list-disc ml-5 space-y-2">
                          {day.activities.map((act, i) => (
                            <li key={i}>
                              <p className="font-medium">{act.name}</p>
                              <p className="text-sm text-gray-600">
                                {act.description}
                              </p>
                              <SafeImage
                                src={act.image}
                                alt={act.name}
                                className="mt-1 w-44 h-28"
                              />
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
                    )}

                    {/* Hotel */}
                    {day.hotel?.name && (
                      <div>
                        <strong>Hotel:</strong>
                        <p className="text-neutral-900">{day.hotel.name}</p>
                        <SafeImage
                          src={day.hotel.image}
                          alt={day.hotel.name}
                          className="mt-1 w-44 h-28"
                        />
                      </div>
                    )}

                    {/* Meals */}
                    {day.meals?.length > 0 && (
                      <div>
                        <strong>Meals:</strong>
                        <ul className="list-disc ml-5 space-y-2">
                          {day.meals.map((meal, i) => (
                            <li key={i}>
                              <p>{meal.name}</p>
                              <SafeImage
                                src={meal.image}
                                alt={meal.name}
                                className="mt-1 w-32 h-20"
                              />
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
            {plan.recommendations?.hotels?.map((hotel, i) => (
              <li key={i}>
                <p className="text-green-600">{hotel.name}</p>
                <SafeImage
                  src={hotel.image}
                  alt={hotel.name}
                  className="mt-1 w-32 h-20"
                />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <strong>Restaurants:</strong>
          <ul className="list-disc ml-5 space-y-2">
            {plan.recommendations?.restaurants?.map((rest, i) => (
              <li key={i}>
                <p className="text-orange-500">{rest.name}</p>
                <SafeImage
                  src={rest.image}
                  alt={rest.name}
                  className="mt-1 w-32 h-20"
                />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <strong>Travel Tips:</strong>
          <ul className="list-disc ml-5">
            {plan.recommendations?.travelTips?.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ViewTrip;
