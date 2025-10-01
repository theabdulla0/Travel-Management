import React, { useState, useEffect, useRef } from "react";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { FaChevronDown } from "react-icons/fa";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { SelectBudgetOptions } from "../../constants/options";

const Hero = () => {
  const [destination, setDestination] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState(undefined);
  const [checkOutDate, setCheckOutDate] = useState(undefined);
  const [packageType, setPackageType] = useState("");

  const inputRef = useRef(null);

  // Debounce destination input
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
        const data = await res.json();
        setSuggestions(data.data || []);
      } catch (err) {
        console.error("Error fetching cities:", err);
      }
    };

    fetchCities();
  }, [debouncedQuery]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section
      className="mt-3 sm:mt-5 rounded-xl sm:rounded-2xl overflow-hidden relative w-[95%] sm:w-[97%] max-w-[1300px] mx-auto h-[70vh] sm:h-[80vh] lg:h-[90vh] flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://dreamstour.dreamstechnologies.com/html/assets/img/tours/home-banner-6.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 text-center px-3 sm:px-4 w-full">
        <h1 className="text-white font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl max-w-3xl mx-auto leading-tight sm:leading-snug">
          Millions Of Experiences. One Simple Search.
        </h1>
        <p className="text-gray-200 text-sm sm:text-lg md:text-xl mt-2 sm:mt-4">
          Find what makes you happy anytime, anywhere
        </p>

        {/* Search Box */}
        <div className="mt-6  sm:mt-10 bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6 w-full max-w-6xl mx-auto flex gap-3 sm:gap-4">
          {/* Destination */}
          <div className="w-full  relative" ref={inputRef}>
            <Input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter your destination"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-md text-sm sm:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {destination && suggestions.length > 0 && (
              <ul className="absolute z-50 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md max-h-60 overflow-y-auto shadow-md">
                {suggestions.map((city) => (
                  <li
                    key={city.id}
                    className="px-3 sm:px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm sm:text-base"
                    onClick={() => {
                      setDestination(
                        `${city.name}, ${city.countryCode || city.country}`
                      );
                      setSuggestions([]);
                    }}
                  >
                    {city.name}, {city.countryCode || city.country}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Package */}
          <div className="w-full">
            <Select onValueChange={setPackageType}>
              <SelectTrigger className="w-full sm:w-full text-sm sm:text-base">
                <SelectValue placeholder="Select Package" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {SelectBudgetOptions.map((opt) => (
                    <SelectItem
                      key={opt.id}
                      value={opt.id}
                      className="text-sm sm:text-base"
                    >
                      {opt.icon} {opt.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Date Selection Row */}
          <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Check In */}
            <div className="flex-1">
              <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between font-normal text-sm sm:text-base py-2 sm:py-3"
                  >
                    {checkInDate
                      ? checkInDate.toLocaleDateString()
                      : "Check-in"}
                    <FaChevronDown className="text-xs sm:text-sm" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={checkInDate}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setCheckInDate(date);
                      setCheckInOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Check Out */}
            <div className="flex-1">
              <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between font-normal text-sm sm:text-base py-2 sm:py-3"
                  >
                    {checkOutDate
                      ? checkOutDate.toLocaleDateString()
                      : "Check-out"}
                    <FaChevronDown className="text-xs sm:text-sm" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={checkOutDate}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setCheckOutDate(date);
                      setCheckOutOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Search Button */}
          <Button className="w-full sm:w-auto sm:self-center px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-400 text-white text-sm sm:text-base font-medium rounded-md hover:opacity-90 transition">
            Search
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
