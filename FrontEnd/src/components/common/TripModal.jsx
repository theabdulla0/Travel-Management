import React, { useEffect, useRef } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";

function TripModal({ trip, isOpen, onClose }) {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { autoAlpha: 0, scale: 0.95 },
        { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power2.out" }
      );

      // Animate itinerary items
      const items = contentRef.current.querySelectorAll(".itinerary-item");
      gsap.fromTo(
        items,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.5, ease: "power2.out" }
      );

      // Animate images
      const images = contentRef.current.querySelectorAll("img");
      gsap.fromTo(
        images,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.05,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }
  }, [isOpen]);

  if (!trip) return null;

  const plan = trip.tripDetails?.plan || {};

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="mt-2 w-full bg-neutral-900 text-white hover:bg-neutral-800"
        >
          View Details
        </Button>
      </DialogTrigger>

      <DialogContent
        ref={modalRef}
        className="max-w-3xl max-h-[90vh] p-0 overflow-hidden flex flex-col"
      >
        <DialogHeader className="bg-white sticky top-0 z-10 p-6 border-b border-neutral-200">
          <DialogTitle className="text-2xl font-bold">
            {plan.tripTitle}
          </DialogTitle>
          <DialogDescription className="text-neutral-700">
            {plan.destination?.city}, {plan.destination?.country} ·{" "}
            {plan.durationDays} days
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable content */}
        <div
          ref={contentRef}
          className="overflow-y-auto p-6 flex-1 space-y-6"
          style={{ maxHeight: "calc(90vh - 100px)" }} // ensures the content scrolls
        >
          {/* Itinerary */}
          {plan.itinerary?.map((day) => (
            <div
              key={day.day}
              className="itinerary-item border rounded-md p-4 bg-neutral-50"
            >
              <h3 className="font-medium text-neutral-900 mb-2">
                Day {day.day}: {day.title}
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-neutral-700">
                {day.activities?.map((act, idx) => (
                  <li key={idx}>
                    <strong>{act.name}</strong> — {act.description}
                    {act.image && (
                      <img
                        src={act.image}
                        alt={act.name}
                        className="mt-2 w-full h-40 rounded object-cover"
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Recommendations */}
          <div className="space-y-4 mt-6">
            <h2 className="font-semibold text-lg mb-2">⭐ Recommendations</h2>
            <div>
              <strong>Hotels:</strong>
              <ul className="list-disc pl-5">
                {plan.recommendations?.hotels?.map((hotel, idx) => (
                  <li key={idx}>
                    {hotel.name}
                    {hotel.image && (
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-28 mt-2 object-cover rounded"
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TripModal;
