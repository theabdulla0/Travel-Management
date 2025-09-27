import { FaGlobeAmericas } from "react-icons/fa";
import { FaLandmark, FaPlane } from "react-icons/fa6";
import { HiMiniGlobeAsiaAustralia } from "react-icons/hi2";
export const SelectTravelersList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveler in exploration",
    icon: "🏃‍➡️",
    people: "1",
  },
  {
    id: 2,
    title: "Couple",
    desc: "Two hearts on a shared journey",
    icon: "🥂",
    people: "2",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group bound by love and connection",
    icon: "🏡",
    people: "3-5",
  },
  {
    id: 4,
    title: "Group",
    desc: "A gathering of friends or colleagues",
    icon: "👨‍👨‍👦‍👦",
    people: "5+",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Budget-friendly options for the cost-conscious traveler",
    icon: "💵",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Balanced choices for a comfortable experience",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Don't worry about the cost, just enjoy the best",
    icon: "💎",
  },
];

export const SelectTravelSuggestionsOptions = [
  {
    id: 1,
    title: "Create New Trip",
    icon: <FaGlobeAmericas size={40} className="text-[#08CB00]" />,
  },
  {
    id: 2,
    title: "Inspire me where to go",
    icon: <FaPlane size={40} className="text-[#cb0000]" />,
  },
  {
    id: 3,
    title: "Discover hidden gems",
    icon: <FaLandmark size={40} className="text-[#0022cb]" />,
  },
  {
    id: 4,
    title: "Adventure trips",
    icon: <HiMiniGlobeAsiaAustralia size={40} className="text-[#cb00c8]" />,
  },
];
