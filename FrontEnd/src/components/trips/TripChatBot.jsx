import React, { useState, useEffect, useRef } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { IoSend } from "react-icons/io5";
import { SaveTrip, AiGenerateTrip } from "../../features/trips/tripThunk";
import { useDispatch } from "react-redux";
import Loader from "../common/Loader";
import { toast } from "sonner";

function TripChatBot({ setTripPlan }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const messagesEndRef = useRef(null);

  const dispatch = useDispatch();

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

  const startPlan = () => {
    setMessages([
      { role: "user", content: "Create New Trip" },
      { role: "assistant", content: questions[0].text },
    ]);
    setStarted(true);
  };

  const normalizeGroupSize = (answer = "") => {
    if (answer.includes("Solo")) return "Solo";
    if (answer.includes("Couple")) return "Couple";
    if (answer.includes("Family")) return "Family";
    if (answer.includes("Group")) return "Friends";
    return "Solo";
  };

  const normalizeBudget = (answer = "") => {
    if (answer.includes("Low")) return "Low";
    if (answer.includes("Medium")) return "Medium";
    if (answer.includes("High")) return "High";
    return "Medium";
  };

  const buildStructuredPlan = (rawAnswers) => {
    const destInput = rawAnswers[1] || "";
    let city = destInput;
    let country = "";

    if (destInput.includes(",")) {
      [city, country] = destInput.split(",").map((s) => s.trim());
    }

    return {
      startingPoint: rawAnswers[0] || "",
      destination: {
        city: city || "",
        country: country || "",
      },
      groupSize: normalizeGroupSize(rawAnswers[2]),
      budgetCategory: normalizeBudget(rawAnswers[3]),
      durationDays: Number(rawAnswers[4]) || 1,
      interests: Array.isArray(rawAnswers[5])
        ? rawAnswers[5]
        : [rawAnswers[5] || ""],
      specialRequirements: rawAnswers[6] || "",
    };
  };

  const submitAllAnswers = async (allAnswers) => {
    try {
      setLoading(true);

      // 1. Build structured plan
      const plan = buildStructuredPlan(allAnswers);

      // 2. Generate trip via AI
      const aiPlan = await dispatch(AiGenerateTrip(plan)).unwrap();
      console.log("aiPlan", aiPlan);
      setTripPlan(aiPlan);

      // 3. Save trip to DB
      try {
        const res = await dispatch(SaveTrip(aiPlan)).unwrap();
        if (res.success) {
          toast.success("Trip Saved");
        } else {
          toast.error(res.error);
        }
      } catch (saveErr) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Plan generated but DB save failed." },
        ]);
      }

      // 🚮 Remove "generating trip" placeholder
      setMessages((prev) =>
        prev.filter(
          (msg) =>
            !msg.content.includes("Generating and saving your trip plan...")
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
    const newAnswers = [...answers, answer];

    setMessages(newMessages);
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
          content: "Generating and saving your trip plan...",
        },
      ]);
      setTimeout(() => submitAllAnswers(newAnswers), 800);
    }
    setInput("");
  };

  // auto-scroll to bottom
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
              <Loader />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </section>

      <section className="p-4 border-t bg-white flex-shrink-0">
        {currentQuestion?.options ? (
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
        ) : (
          <div className="relative">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your answer..."
              className="w-full h-20 bg-gray-50 border border-gray-300 rounded-lg p-2"
            />
            <Button
              className="absolute bottom-2 right-2 p-2 rounded-full bg-blue-500 hover:bg-blue-600"
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
