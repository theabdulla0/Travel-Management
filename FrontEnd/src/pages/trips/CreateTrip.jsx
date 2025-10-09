import React, { useState, useEffect } from "react";
import LayoutCommon from "../../components/common/LayoutCommon";
import TripChatBot from "../../components/trips/TripChatBot";
import EmptyBoxState from "@/components/trips/EmptyBoxState";
import ViewTrip from "./ViewTrip";

function CreateTrip() {
  const [tripPlan, setTripPlan] = useState(null);

  const plan = {
    plan: {
      tripTitle: "Solo Cultural Exploration of Japan",
      startingPoint: "Mumbai",
      destination: {
        city: "Kyoto",
        country: "Japan",
      },
      groupSize: "Solo",
      budgetCategory: "High",
      durationDays: 4,
      interests: ["Cultural"],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Kyoto & Gion Exploration",
          activities: [
            {
              name: "Kiyomizu-dera Temple",
              description:
                "Visit the iconic Kiyomizu-dera Temple with its wooden stage and stunning views.",
              mapLink:
                "https://www.google.com/maps/search/?api=1&query=Kiyomizu-dera+Temple,Kyoto,Japan",
              image:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Kiyomizu.jpg/1200px-Kiyomizu.jpg",
            },
            {
              name: "Gion District",
              description:
                "Wander through Gion, Kyoto's geisha district, known for its traditional wooden machiya houses.",
              mapLink:
                "https://www.google.com/maps/search/?api=1&query=Gion+District,Kyoto,Japan",
              image:
                "https://www.jrailpass.com/blog/wp-content/uploads/2019/08/kyoto-higashiyama-spring-e1565349210664.jpg",
            },
          ],
          hotel: {
            name: "The Ritz-Carlton, Kyoto",
            mapLink:
              "https://www.google.com/maps/search/?api=1&query=The+Ritz-Carlton,Kyoto,Kyoto,Japan",
            image:
              "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/1e/41/c1/hotel-exterior.jpg?w=900&h=500&s=1",
          },
          meals: [
            {
              name: "Gion Karyo",
              mapLink:
                "https://www.google.com/maps/search/?api=1&query=Gion+Karyo,Kyoto,Japan",
              image:
                "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/60/88/cf/caption.jpg?w=900&h=-1&s=1",
            },
          ],
        },
        {
          day: 2,
          title: "Zen Gardens & Bamboo Forest",
          activities: [
            {
              name: "Ryoan-ji Temple",
              description:
                "Meditate at the famous Zen garden of Ryoan-ji Temple.",
              mapLink:
                "https://www.google.com/maps/search/?api=1&query=Ryoan-ji+Temple,Kyoto,Japan",
              image: "https://www.japan-guide.com/g18/3909_01.jpg",
            },
            {
              name: "Arashiyama Bamboo Grove",
              description:
                "Stroll through the enchanting Arashiyama Bamboo Grove.",
              mapLink:
                "https://www.google.com/maps/search/?api=1&query=Arashiyama+Bamboo+Grove,Kyoto,Japan",
              image:
                "https://photos.smugmug.com/i-hFcX6RC/0/1c58ee68/L/famous-bamboo-grove-arashiyama-L.jpg",
            },
          ],
          hotel: {
            name: "The Ritz-Carlton, Kyoto",
            mapLink:
              "https://www.google.com/maps/search/?api=1&query=The+Ritz-Carlton,Kyoto,Kyoto,Japan",
            image:
              "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/1e/41/c1/hotel-exterior.jpg?w=900&h=500&s=1",
          },
          meals: [
            {
              name: "Shoraian",
              mapLink:
                "https://www.google.com/maps/search/?api=1&query=Shoraian,Kyoto,Japan",
              image:
                "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/41/86/43/6.jpg?w=900&h=500&s=1",
            },
          ],
        },
        {
          day: 3,
          title: "Golden Pavilion & Nishiki Market",
          activities: [
            {
              name: "Kinkaku-ji (Golden Pavilion)",
              description:
                "Marvel at the stunning Kinkaku-ji (Golden Pavilion), covered in gold leaf.",
              mapLink:
                "https://www.google.com/maps/search/?api=1&query=Kinkaku-ji,Kyoto,Japan",
              image: "https://www.japan-guide.com/g18/3908_top.jpg",
            },
            {
              name: "Nishiki Market",
              description:
                "Explore Nishiki Market, Kyoto's vibrant kitchen, and sample local delicacies.",
              mapLink:
                "https://www.google.com/maps/search/?api=1&query=Nishiki+Market,Kyoto,Japan",
              image: "https://www.japan-guide.com/g18/3931_top.jpg",
            },
          ],
          hotel: {
            name: "The Ritz-Carlton, Kyoto",
            mapLink:
              "https://www.google.com/maps/search/?api=1&query=The+Ritz-Carlton,Kyoto,Kyoto,Japan",
            image:
              "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/1e/41/c1/hotel-exterior.jpg?w=900&h=500&s=1",
          },
          meals: [
            {
              name: "Kikunoi",
              mapLink:
                "https://www.google.com/maps/search/?api=1&query=Kikunoi,Kyoto,Japan",
              image:
                "https://d267qvt8mf7rfa.cloudfront.net/restaurant/111/mainImage.jpg",
            },
          ],
        },
        {
          day: 4,
          title: "Fushimi Inari Shrine & Departure",
          activities: [
            {
              name: "Fushimi Inari Shrine",
              description:
                "Walk through the thousands of vibrant red torii gates at Fushimi Inari Shrine.",
              mapLink:
                "https://www.google.com/maps/search/?api=1&query=Fushimi+Inari+Shrine,Kyoto,Japan",
              image:
                "https://dskyoto.s3.amazonaws.com/gallery/full/8514/5559/7797/08-20131216_FushimiInari_Mainspot-307.jpg",
            },
            {
              name: "Explore local shops near Kyoto Station",
              description:
                "Browse local crafts and souvenirs before heading to the airport",
              mapLink:
                "https://www.google.com/maps/search/?api=1&query=Kyoto+Station,Kyoto,Japan",
              image:
                "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/cc/8a/fe/caption.jpg?w=500&h=500&s=1",
            },
          ],
          hotel: {
            name: "Hotel Granvia Kyoto",
            mapLink:
              "https://www.google.com/maps/search/?api=1&query=Hotel+Granvia+Kyoto,Kyoto,Japan",
            image:
              "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/2a/b5/79/caption.jpg?w=900&h=500&s=1",
          },
          meals: [
            {
              name: "Iharada",
              mapLink:
                "https://www.google.com/maps/search/?api=1&query=Iharada,Kyoto,Japan",
              image:
                "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/1b/29/fe/photo2jpg.jpg?w=900&h=500&s=1",
            },
          ],
        },
      ],
      recommendations: {
        hotels: [
          {
            name: "The Ritz-Carlton, Kyoto",
            mapLink:
              "https://www.google.com/maps/search/?api=1&query=The+Ritz-Carlton,Kyoto,Kyoto,Japan",
            image:
              "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/1e/41/c1/hotel-exterior.jpg?w=900&h=500&s=1",
          },
          {
            name: "Hyatt Regency Kyoto",
            mapLink:
              "https://www.google.com/maps/search/?api=1&query=Hyatt+Regency+Kyoto,Kyoto,Japan",
            image:
              "https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2020/10/01/0450/Hyatt-Regency-Kyoto-P1805-Hotel-Exterior.jpg/Hyatt-Regency-Kyoto-P1805-Hotel-Exterior.4x3.jpg",
          },
        ],
        restaurants: [
          {
            name: "Kikunoi",
            mapLink:
              "https://www.google.com/maps/search/?api=1&query=Kikunoi,Kyoto,Japan",
            image:
              "https://d267qvt8mf7rfa.cloudfront.net/restaurant/111/mainImage.jpg",
          },
          {
            name: "Gion Karyo",
            mapLink:
              "https://www.google.com/maps/search/?api=1&query=Gion+Karyo,Kyoto,Japan",
            image:
              "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/60/88/cf/caption.jpg?w=900&h=-1&s=1",
          },
        ],
        travelTips: [
          "Purchase a Japan Rail Pass if you plan to travel extensively by train.",
          "Learn basic Japanese phrases for a more immersive experience.",
          "Carry cash, as some smaller establishments may not accept credit cards.",
        ],
      },
    },
  };

  return (
    <LayoutCommon>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-10">
        <div>
          <EmptyBoxState />
          <TripChatBot setTripPlan={setTripPlan} />
        </div>
        <div>
          <ViewTrip trip={plan} />
        </div>
      </div>
    </LayoutCommon>
  );
}

export default CreateTrip;
