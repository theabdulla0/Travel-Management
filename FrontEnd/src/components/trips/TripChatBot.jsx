import React, { useState, useEffect, useRef } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

function TripChatBot({ setTripPlan }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [expandedDay, setExpandedDay] = useState(null);
  const messagesEndRef = useRef(null);

  const questions = [
    { text: "Where are you starting from?" },
    { text: "What is your destination city or country?" },
    {
      text: "Group size?",
      options: ["👤 Solo", "👥 Couple", "👨‍👩‍👧‍👦 Family", "👪 Group"],
    },
    {
      text: "What is your budget?",
      options: ["💰 Low", "💰💰 Medium", "💰💰💰 High"],
    },
    { text: "How many days will you travel?" },
    {
      text: "What are your interests?",
      options: ["Adventure", "Sightseeing", "Cultural", "Food", "Nightlife", "Relaxation"],
    },
    { text: "Any special requirements or preferences?" },
  ];

  useEffect(() => {
    if (messages.length) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const LoadingDots = () => (
    <div className="flex space-x-1 animate-pulse">
      <span className="w-2 h-2 bg-gray-700 rounded-full"></span>
      <span className="w-2 h-2 bg-gray-700 rounded-full"></span>
      <span className="w-2 h-2 bg-gray-700 rounded-full"></span>
    </div>
  );

  const startPlan = () => {
    setMessages([
      { role: "user", content: "Create New Trip" },
      { role: "assistant", content: questions[0].text },
    ]);
    setStarted(true);
  };

  const submitAllAnswers = async (allAnswers) => {
    try {
      setLoading(true);
      // Generate trip plan
      console.log("TripChatBot: Sending to /api/ai at", new Date().toLocaleString(), ":", { plan: allAnswers });
      const response = await axios.post("http://localhost:3000/api/ai", {
        plan: allAnswers,
      }); // Cookies sent automatically
      const aiPlan = response.data || { error: "No trip plan received from server." };
      console.log("TripChatBot: Received from /api/ai at", new Date().toLocaleString(), ":", aiPlan);

      // Update parent component with trip plan
      setTripPlan(aiPlan);

      // Save trip plan to database
      try {
        console.log("TripChatBot: Sending to /api/trip/trip-save at", new Date().toLocaleString(), ":", { plan: aiPlan });
        const saveResponse = await axios.post("http://localhost:3000/api/trip/trip-save", {
          plan: aiPlan,
        }); // Cookies sent automatically
        console.log("TripChatBot: Save Trip Response at", new Date().toLocaleString(), ":", saveResponse.data);
      } catch (saveErr) {
        console.error("TripChatBot: Failed to save trip at", new Date().toLocaleString(), ":", {
          message: saveErr.message,
          response: saveErr.response?.data,
          status: saveErr.response?.status,
        });
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Trip plan generated but failed to save to database. You can still view it below." },
        ]);
      }

      setMessages((prev) => [
        ...prev.filter((msg) => !msg.content.includes("generating the best possible trip")),
        { role: "assistant", content: "Here’s your AI-generated trip plan! 🛫", tripData: aiPlan },
      ]);
    } catch (err) {
      console.error("TripChatBot: Error generating trip at", new Date().toLocaleString(), ":", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Oops! Something went wrong while generating your trip plan." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (answer) => {
    if (!answer) return;

    const newMessages = [...messages, { role: "user", content: answer }];
    setMessages(newMessages);
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setTimeout(() => {
        setMessages([...newMessages, { role: "assistant", content: questions[currentQIndex + 1].text }]);
      }, 500);
    } else {
      setMessages([...newMessages, { role: "assistant", content: "Thanks for your answers! Generating and saving your trip plan..." }]);
      setTimeout(() => submitAllAnswers(newAnswers), 800);
    }
    setInput("");
  };

  const toggleDay = (day) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  if (!started) {
    return (
      <div className="h-[80vh] flex flex-col items-center gap-4 p-4">
        <Button
          variant="outline"
          className="w-full flex items-center justify-start gap-4 p-4 text-left hover:bg-gray-100 shadow-sm"
          onClick={startPlan}
        >
          ✈️ Create New Trip
        </Button>
      </div>
    );
  }

  const currentQuestion = questions[currentQIndex];
  const tripPlanMessage = messages.find((msg) => msg.tripData);

  return (
    <div className="h-[80vh] flex flex-col border rounded-xl shadow-lg bg-white">
      <section className="flex-1 overflow-y-auto p-4 bg-gray-50 scrollbar-thin scrollbar-thumb-gray-400">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex mt-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-xl shadow-sm ${
                msg.role === "user"
                  ? "bg-green-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.tripData ? (
                <div className="space-y-6">
                  <h1 className="text-xl font-bold">{msg.tripData.tripTitle}</h1>
                  <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
                    <p><strong>From:</strong> {msg.tripData.startingPoint}</p>
                    <p><strong>To:</strong> {msg.tripData.destination}</p>
                    <p><strong>Duration:</strong> {msg.tripData.durationDays} days</p>
                    <p><strong>Budget:</strong> {msg.tripData.budgetCategory}</p>
                    <p><strong>Group:</strong> {msg.tripData.groupSize}</p>
                    <p><strong>Interests:</strong> {msg.tripData.interests.join(", ")}</p>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Itinerary Timeline</h2>
                    <div className="relative">
                      <div className="absolute left-4 top-0 h-full w-1 bg-blue-500"></div>
                      {msg.tripData.itinerary.map((day) => (
                        <div key={day.day} className="relative mb-8 pl-12">
                          <div className="absolute left-2.5 top-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                          <div className="border rounded-lg shadow-sm bg-white overflow-hidden">
                            <button
                              className="flex justify-between items-center w-full px-4 py-3 text-left font-semibold text-gray-800 hover:bg-gray-50 focus:outline-none"
                              onClick={() => toggleDay(day.day)}
                            >
                              <span>Day {day.day}: {day.title}</span>
                              {expandedDay === day.day ? <HiChevronUp size={20} /> : <HiChevronDown size={20} />}
                            </button>
                            {expandedDay === day.day && (
                              <div className="px-6 py-4 text-gray-700 space-y-2 bg-gray-50">
                                <ul className="list-disc ml-5 space-y-1">
                                  {day.activities.map((activity, idx) => (
                                    <li key={idx}>{activity}</li>
                                  ))}
                                  <li><strong>Hotel:</strong> {day.hotel}</li>
                                  <li><strong>Meals:</strong> {day.meals.join(", ")}</li>
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold">Recommendations</h2>
                    <p><strong>Hotels:</strong> {msg.tripData.recommendations.hotels.join(", ")}</p>
                    <p><strong>Restaurants:</strong> {msg.tripData.recommendations.restaurants.join(", ")}</p>
                    <p><strong>Travel Tips:</strong> {msg.tripData.recommendations.travelTips.join("; ")}</p>
                  </div>
                </div>
              ) : (
                msg.content
              )}
              <span className="block text-xs text-gray-500 mt-1">
                {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start mt-2">
            <div className="bg-gray-300 px-4 py-2 rounded-xl shadow-sm">
              <LoadingDots />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </section>

      <section className="p-4 border-t bg-white flex-shrink-0">
        {currentQuestion?.options && !tripPlanMessage ? (
          <div className="flex flex-wrap gap-2">
            {currentQuestion.options.map((opt) => (
              <Button
                key={opt}
                variant="outline"
                onClick={() => handleAnswer(opt)}
                className="px-4 py-2 rounded-lg hover:bg-gray-100 shadow-sm"
              >
                {opt}
              </Button>
            ))}
          </div>
        ) : !tripPlanMessage ? (
          <div className="relative">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your answer..."
              className="w-full h-20 bg-gray-50 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              autoFocus
            />
            <Button
              className="absolute bottom-2 right-2 p-2 rounded-full bg-blue-500 hover:bg-blue-600"
              onClick={() => handleAnswer(input)}
            >
              <IoSend className="h-5 w-5 text-white" />
            </Button>
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default TripChatBot;