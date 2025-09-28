import React, { useState, useEffect } from "react";
import LayoutCommon from "../../components/common/LayoutCommon";
import TripChatBot from "../../components/trips/TripChatBot";
import EmptyBoxState from "@/components/trips/EmptyBoxState";
import ViewTrip from "./ViewTrip";

function CreateTrip() {
  const [tripPlan, setTripPlan] = useState(null);
  const tripData = {
    tripTitle: "Delhi Family Sightseeing Trip",
    startingPoint: "Delhi",
    destination: {
      city: "Delhi",
      country: "India",
    },
    groupSize: "Family",
    budgetCategory: "Low",
    durationDays: 2,
    interests: ["Sightseeing"],
    itinerary: [
      {
        day: 1,
        title: "Old Delhi Exploration",
        activities: [
          {
            name: "Red Fort",
            description:
              "Explore the historic Red Fort, a UNESCO World Heritage Site.",
            mapLink:
              "https://www.google.com/maps/search/?api=1&query=Red+Fort,Delhi,India",
            image: "https://source.unsplash.com/600x400/?Red+Fort,Delhi",
          },
          {
            name: "Chandni Chowk",
            description: "Wander through the bustling market of Chandni Chowk.",
            mapLink:
              "https://www.google.com/maps/search/?api=1&query=Chandni+Chowk,Delhi,India",
            image: "https://source.unsplash.com/600x400/?Chandni+Chowk,Delhi",
          },
          {
            name: "Jama Masjid",
            description: "Visit Jama Masjid, one of India's largest mosques.",
            mapLink:
              "https://www.google.com/maps/search/?api=1&query=Jama+Masjid,Delhi,India",
            image: "https://source.unsplash.com/600x400/?Jama+Masjid,Delhi",
          },
        ],
        hotel: {
          name: "Hotel City Star",
          mapLink:
            "https://www.google.com/maps/search/?api=1&query=Hotel+City+Star+Delhi,Delhi,India",
          image: "https://source.unsplash.com/600x400/?hotel,Delhi",
        },
        meals: [
          {
            name: "Karim's",
            mapLink:
              "https://www.google.com/maps/search/?api=1&query=Karim's+Delhi,Delhi,India",
            image: "https://source.unsplash.com/600x400/?restaurant,Delhi",
          },
        ],
      },
      {
        day: 2,
        title: "New Delhi Highlights",
        activities: [
          {
            name: "India Gate",
            description: "Pay respects at India Gate, a war memorial.",
            mapLink:
              "https://www.google.com/maps/search/?api=1&query=India+Gate,Delhi,India",
            image: "https://source.unsplash.com/600x400/?India+Gate,Delhi",
          },
          {
            name: "Humayun's Tomb",
            description:
              "Explore Humayun's Tomb, a precursor to the Taj Mahal.",
            mapLink:
              "https://www.google.com/maps/search/?api=1&query=Humayun's+Tomb,Delhi,India",
            image: "https://source.unsplash.com/600x400/?Humayun's+Tomb,Delhi",
          },
          {
            name: "Qutub Minar",
            description: "Visit Qutub Minar, a UNESCO World Heritage Site.",
            mapLink:
              "https://www.google.com/maps/search/?api=1&query=Qutub+Minar,Delhi,India",
            image: "https://source.unsplash.com/600x400/?Qutub+Minar,Delhi",
          },
        ],
        hotel: {
          name: "Hotel City Star",
          mapLink:
            "https://www.google.com/maps/search/?api=1&query=Hotel+City+Star+Delhi,Delhi,India",
          image: "https://source.unsplash.com/600x400/?hotel,Delhi",
        },
        meals: [
          {
            name: "Saravana Bhavan",
            mapLink:
              "https://www.google.com/maps/search/?api=1&query=Saravana+Bhavan+Delhi,Delhi,India",
            image: "https://source.unsplash.com/600x400/?restaurant,Delhi",
          },
        ],
      },
    ],
    recommendations: {
      hotels: [
        {
          name: "Hotel Sunstar Heritage",
          mapLink:
            "https://www.google.com/maps/search/?api=1&query=Hotel+Sunstar+Heritage+Delhi,Delhi,India",
          image: "https://source.unsplash.com/600x400/?hotel,Delhi",
        },
      ],
      restaurants: [
        {
          name: "Indian Accent",
          mapLink:
            "https://www.google.com/maps/search/?api=1&query=Indian+Accent+Delhi,Delhi,India",
          image: "https://source.unsplash.com/600x400/?restaurant,Delhi",
        },
      ],
      travelTips: [
        "Bargain while shopping in local markets.",
        "Stay hydrated, especially during the summer months.",
        "Use ride-sharing apps for convenient transportation.",
      ],
    },
  };
  useEffect(() => {
    console.log(
      "CreateTrip: tripPlan state updated at",
      new Date().toLocaleString(),
      ":",
      tripPlan
    );
  }, [tripPlan]);

  return (
    <LayoutCommon>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-10">
        <div>
          <EmptyBoxState />
          <TripChatBot setTripPlan={setTripPlan} />
        </div>
        <div>
          <ViewTrip trip={tripData} />
        </div>
      </div>
    </LayoutCommon>
  );
}

export default CreateTrip;
