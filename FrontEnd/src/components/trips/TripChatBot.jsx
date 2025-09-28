import React, { useState, useEffect, useRef } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { IoSend } from "react-icons/io5";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import TripAPI from "@/api/tripAPI";

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
      options: [
        "Adventure",
        "Sightseeing",
        "Cultural",
        "Food",
        "Nightlife",
        "Relaxation",
      ],
    },
    { text: "Any special requirements or preferences?" },
  ];

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
      const response = await TripAPI.post("/ai", { plan: allAnswers });
      const aiPlan = response.data || {
        error: "No trip plan received from server.",
      };

      setTripPlan(aiPlan);

      // Save trip plan to database
      try {
        const saveResponse = await TripAPI.post("/save-trip", { plan: aiPlan });
        console.log("Trip saved:", saveResponse.data);
      } catch (saveErr) {
        console.error("Failed to save trip:", saveErr.response?.data);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Trip plan generated but failed to save to database. You can still view it below.",
          },
        ]);
      }

      // Remove "generating" placeholder
      setMessages((prev) =>
        prev.filter(
          (msg) => !msg.content.includes("generating the best possible trip")
        )
      );
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Oops! Something went wrong while generating your trip plan.",
        },
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
        setMessages([
          ...newMessages,
          { role: "assistant", content: questions[currentQIndex + 1].text },
        ]);
      }, 500);
    } else {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "Thanks for your answers! Generating and saving your trip plan...",
        },
      ]);
      setTimeout(() => submitAllAnswers(newAnswers), 800);
    }
    setInput("");
  };

  const toggleDay = (day) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  // auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
            className={`flex mt-3 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-xl shadow-sm ${
                msg.role === "user"
                  ? "bg-green-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              <div>{msg.content}</div>
              <span className="block text-xs text-gray-500 mt-1">
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
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
