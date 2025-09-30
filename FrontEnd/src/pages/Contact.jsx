import LayoutCommon from "@/components/common/LayoutCommon";
import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  return (
    <LayoutCommon>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white py-20 px-6 lg:px-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">📬 Contact Us</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
            We’d love to hear from you — whether it’s feedback, questions, or
            just to say hello!
          </p>
        </section>

        {/* Contact Form */}
        <section className="py-16 px-6 lg:px-16 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Info */}
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-neutral-900">
              📞 Get in Touch
            </h2>
            <p className="text-gray-600">
              Have a question about TripPlanner? Want to partner with us? Our
              inbox is always open.
            </p>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-neutral-800" />{" "}
                contact@tripplanner.com
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-neutral-800" /> +1 (234) 567-890
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-neutral-800" /> 123 Travel Lane,
                Adventure City
              </li>
            </ul>
          </div>

          {/* Right: Form */}
          <div className="bg-white shadow rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-6 text-neutral-900">
              ✍️ Send us a Message
            </h3>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-neutral-800 focus:border-neutral-800 sm:text-sm"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-neutral-800 focus:border-neutral-800 sm:text-sm"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-neutral-800 focus:border-neutral-800 sm:text-sm"
                  placeholder="Write your message..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-neutral-900 text-white px-4 py-2 rounded-md hover:bg-neutral-800 shadow"
              >
                📤 Send Message
              </button>
            </form>
          </div>
        </section>

        {/* Footer / Call to Action */}
        <section className="py-16 bg-gradient-to-r from-neutral-900 to-neutral-800 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            🌟 Let's Plan Your Next Adventure
          </h2>
          <p className="text-gray-300 mb-8">
            Drop us a message, and we’ll help you get started with TripPlanner.
          </p>
          <a
            href="/create-trip"
            className="px-6 py-3 bg-white text-neutral-900 font-medium rounded-lg shadow hover:bg-gray-200 transition"
          >
            Start Planning
          </a>
        </section>
      </div>
    </LayoutCommon>
  );
}

export default Contact;
