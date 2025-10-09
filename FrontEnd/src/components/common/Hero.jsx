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
import { toast } from "sonner";

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
        toast.error("Error fetching cities");
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
      className="relative w-full min-h-[60svh] sm:min-h-[70svh] lg:min-h-[80svh] flex items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl"
      style={{
        backgroundImage:
          "url('https://dreamstour.dreamstechnologies.com/html/assets/img/tours/home-banner-6.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center w-full px-4 sm:px-6 max-w-[1300px]">
        <h1 className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight sm:leading-snug max-w-3xl mx-auto">
          Millions Of Experiences. One Simple Search.
        </h1>
        <p className="text-gray-200 text-sm sm:text-lg md:text-xl mt-2 sm:mt-4">
          Find what makes you happy anytime, anywhere
        </p>

        {/* Search Box */}
        <div className="mt-6 sm:mt-10 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3 sm:p-4 md:p-6 w-full max-w-6xl mx-auto grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-12 items-center">
          {/* Destination */}
          <div
            className="relative col-span-1 md:col-span-2 lg:col-span-4"
            ref={inputRef}
          >
            <Input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter your destination"
              autoComplete="off"
              className="w-full bg-white px-3 sm:px-4 text-sm sm:text-base"
            />
            {destination && suggestions.length > 0 && (
              <ul className="absolute z-50 left-0 right-0 mt-1 bg-white rounded-md max-h-60 overflow-y-auto shadow-lg ring-1 ring-black/10">
                {suggestions.map((city) => (
                  <li
                    key={city.id}
                    className="px-3 sm:px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm sm:text-base truncate"
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
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <Select onValueChange={setPackageType} value={packageType}>
              <SelectTrigger className="w-full bg-white text-sm sm:text-base">
                <SelectValue placeholder="Select Package" />
              </SelectTrigger>
              <SelectContent sideOffset={6}>
                <SelectGroup>
                  {SelectBudgetOptions.map((opt) => (
                    <SelectItem key={opt.id} value={opt.id}>
                      {opt.icon} {opt.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Check In */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full  justify-between font-normal text-sm sm:text-base"
                >
                  {checkInDate ? checkInDate.toLocaleDateString() : "Check-in"}
                  <FaChevronDown className="text-xs sm:text-sm opacity-70" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
                sideOffset={8}
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
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between font-normal text-sm sm:text-base"
                >
                  {checkOutDate
                    ? checkOutDate.toLocaleDateString()
                    : "Check-out"}
                  <FaChevronDown className="text-xs sm:text-sm opacity-70" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
                sideOffset={8}
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

          {/* Search Button */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <Button className="w-full  px-6 sm:px-8 bg-gradient-to-r from-blue-500 to-blue-400 text-white text-sm sm:text-base font-medium rounded-md hover:opacity-90 transition">
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
