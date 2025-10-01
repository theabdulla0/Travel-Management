import LayoutCommon from "@/components/common/LayoutCommon";
import React from "react";
import {
  FaMapMarkedAlt,
  FaUsers,
  FaGlobeAmericas,
  FaRobot,
} from "react-icons/fa";

function About() {
  return (
    <LayoutCommon>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white py-20 px-6 lg:px-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About TripPlanner ✈️
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
            Your AI-powered personal travel assistant. Plan smarter, explore
            better, and make every journey memorable.
          </p>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-6 lg:px-16 max-w-5xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-semibold text-neutral-900">
            ✨ Our Mission
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            We built TripPlanner to take the stress out of travel planning. By
            combining the power of AI, real-time data, and curated
            recommendations, we help travelers create personalized itineraries —
            turning travel dreams into reality.
          </p>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white px-6 lg:px-16">
          <h2 className="text-3xl font-semibold text-center mb-12 text-neutral-900">
            🌍 Why Choose TripPlanner?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="p-6 rounded-lg shadow bg-gray-50 hover:shadow-lg transition text-center">
              <FaMapMarkedAlt className="text-4xl mx-auto text-neutral-900 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Smart Itineraries</h3>
              <p className="text-gray-600 text-sm">
                Get a custom day-by-day plan tailored to your interests and
                time.
              </p>
            </div>
            <div className="p-6 rounded-lg shadow bg-gray-50 hover:shadow-lg transition text-center">
              <FaRobot className="text-4xl mx-auto text-neutral-900 mb-4" />
              <h3 className="font-semibold text-lg mb-2">
                AI-Powered Planning
              </h3>
              <p className="text-gray-600 text-sm">
                Harness the power of AI & Google Maps for smarter decisions.
              </p>
            </div>
            <div className="p-6 rounded-lg shadow bg-gray-50 hover:shadow-lg transition text-center">
              <FaUsers className="text-4xl mx-auto text-neutral-900 mb-4" />
              <h3 className="font-semibold text-lg mb-2">For Every Traveler</h3>
              <p className="text-gray-600 text-sm">
                Solo adventurer, family trip, or group getaway — we got you
                covered.
              </p>
            </div>
            <div className="p-6 rounded-lg shadow bg-gray-50 hover:shadow-lg transition text-center">
              <FaGlobeAmericas className="text-4xl mx-auto text-neutral-900 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Global Reach</h3>
              <p className="text-gray-600 text-sm">
                Discover recommendations for destinations across the world.
              </p>
            </div>
          </div>
        </section>

        {/* Footer / Call to Action */}
        <section className="py-16 bg-gradient-to-r from-neutral-900 to-neutral-800 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Ready to Plan Your Next Adventure?
          </h2>
          <p className="text-gray-300 mb-8">
            Start exploring with TripPlanner today and create a journey that’s
            uniquely yours.
          </p>
          <a
            href="/create-trip"
            className="px-6 py-3 bg-white text-neutral-900 font-medium rounded-lg shadow hover:bg-gray-200 transition"
          >
            🌟 Create a Trip
          </a>
        </section>
      </div>
    </LayoutCommon>
  );
}

export default About;
