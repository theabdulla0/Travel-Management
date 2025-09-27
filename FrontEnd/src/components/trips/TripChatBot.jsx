import React, { useState, useEffect, useRef } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { SelectTravelSuggestionsOptions } from "@/constants/options";

function TripChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const messagesEndRef = useRef(null);
  const userSentRef = useRef(false);
  const token = localStorage.getItem("accessToken");

  const questions = [
    { text: "Where are you starting from?" },
    { text: "What is your destination city or country?" },
    { text: "Group size?", options: ["Solo", "Couple", "Family", "Friends"] },
    { text: "What is your budget?", options: ["Low", "Medium", "High"] },
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

  // Scroll to latest message
  useEffect(() => {
    if (userSentRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      userSentRef.current = false;
    }
  }, [messages]);

  // AI typing animation
  const LoadingDots = () => (
    <div className="flex space-x-1">
      <span className="w-2 h-2 bg-gray-700 rounded-full animate-bounce"></span>
      <span className="w-2 h-2 bg-gray-700 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
      <span className="w-2 h-2 bg-gray-700 rounded-full animate-bounce [animation-delay:-0.4s]"></span>
    </div>
  );

  // Start trip planning
  const startPlan = () => {
    // Add "Create Trip" click to chat as a message
    setMessages((prev) => [
      ...prev,
      { role: "user", content: "Create New Trip" },
    ]);

    setStarted(true);

    // AI starts after slight delay for animation
    setLoading(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: questions[0].text },
      ]);
      setLoading(false);
    }, 800); // AI typing delay
  };

  const handleAnswer = (answer) => {
    if (!answer) return;

    userSentRef.current = true;
    setMessages((prev) => [...prev, { role: "user", content: answer }]);
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQIndex < questions.length - 1) {
      // Next question
      setCurrentQIndex(currentQIndex + 1);
      setLoading(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: questions[currentQIndex + 1].text },
        ]);
        setLoading(false);
      }, 700);
    } else {
      // Last answer: show thank you message + processing animation
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Thanks for giving all your answers! We are generating the best possible trip plan...",
        },
      ]);

      // Small delay to simulate "processing"
      setLoading(true);
      setTimeout(() => submitAllAnswers(newAnswers), 1000);
    }

    setInput("");
  };

  const submitAllAnswers = async (allAnswers) => {
    try {
      const result = await axios.post("http://localhost:3000/api/ai-model", {
        plan: allAnswers,
      });

      const aiPlan = result.data.resp || "No response";

      console.log("AI Trip Plan:", aiPlan);

      // Save to DB
      await axios.post(
        "http://localhost:3000/api/trip/save-trip",
        { plan: aiPlan },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessages((prev) => [
        ...prev.filter(
          (msg) =>
            !msg.content.includes("We are generating the best possible trip")
        ),
        { role: "assistant", content: aiPlan },
      ]);
    } catch (err) {
      console.error("AI error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Oops! Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!started) {
    return (
      <div className="h-[80vh] flex flex-col items-center gap-4 p-4">
        {SelectTravelSuggestionsOptions.map((option) => (
          <Button
            key={option.id}
            variant="outline"
            className="w-full flex items-center justify-start gap-4 p-4 text-left hover:bg-gray-100"
            onClick={startPlan}
          >
            {option.icon}
            <span className="text-lg font-medium">{option.title}</span>
          </Button>
        ))}
      </div>
    );
  }

  const currentQuestion = questions[currentQIndex];

  return (
    <div className="h-[80vh] flex flex-col border rounded-xl shadow-lg overflow-hidden">
      {/* Chat messages */}
      <section className="flex-1 overflow-y-auto p-4 bg-gray-50 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex mt-2 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-lg px-4 py-2 rounded-xl break-words ${
                msg.role === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-400 text-white rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start mt-2">
            <div className="bg-gray-300 px-4 py-2 rounded-xl">
              <LoadingDots />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </section>

      {/* User input / options */}
      <section className="p-4 border-t bg-white">
        {currentQuestion?.options ? (
          <div className="flex flex-wrap gap-2">
            {currentQuestion.options.map((opt) => (
              <Button
                key={opt}
                variant="outline"
                onClick={() => handleAnswer(opt)}
                className="px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                {opt}
              </Button>
            ))}
          </div>
        ) : (
          <div className="relative">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your answer..."
              className="w-full h-20 bg-gray-50 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
            <Button
              className="absolute cursor-pointer bottom-2 right-2 p-2 rounded-full hover:bg-blue-600"
              onClick={() => handleAnswer(input)}
            >
              <IoSend className="h-5 w-5 text-white" />
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}

export default TripChatBot;
