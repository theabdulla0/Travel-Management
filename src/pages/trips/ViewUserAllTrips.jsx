import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ViewTrips } from "../../features/trips/tripThunk";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LayoutCommon from "../../components/common/LayoutCommon";
import Loader from "@/components/common/Loader";
import { SafeImage } from "@/components/common/SafeImage";

function ViewUserAllTrips() {
  const dispatch = useDispatch();
  const { tripPlan, loading, error } = useSelector((state) => state.trip);
  const [selectedTrip, setSelectedTrip] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        await dispatch(ViewTrips()).unwrap();
      } catch (err) {
        console.error("Error fetching trips:", err);
      }
    };
    fetchTrips();
  }, [dispatch]);

  return (
    <LayoutCommon>
      <div className="p-6">
        {/* 🔹 Page Headline */}
        <h1 className="text-3xl font-bold mb-6 text-neutral-900 flex items-center gap-2">
          ✈️ Your Planned Trips
        </h1>

        {/* 🔹 Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && (
            <div className="col-span-full flex justify-center mt-10">
              <Loader className="w-12 h-12" />
            </div>
          )}

          {error && !loading && (
            <div className="col-span-full flex justify-center mt-10">
              <p className="text-red-500 text-lg font-medium">Error: {error}</p>
            </div>
          )}

          {!loading && !error && tripPlan?.length === 0 && (
            <div className="col-span-full flex justify-center mt-10">
              <p className="text-gray-500 text-lg">No trips found yet. 🚀</p>
            </div>
          )}

          {!loading &&
            !error &&
            tripPlan?.map((trip) => {
              const plan = trip.tripDetails?.plan || {};
              const coverImage =
                plan.image || plan.itinerary?.[0]?.activities?.[0]?.image;

              return (
                <Card
                  key={trip._id}
                  className="shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 rounded-xl overflow-hidden border border-neutral-200"
                >
                  {/* Cover Image */}
                  <div className="h-40 w-full overflow-hidden">
                    <SafeImage
                      src={coverImage}
                      alt={plan.tripTitle || "Trip destination"}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Card Header */}
                  <CardHeader className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white rounded-t-none">
                    <CardTitle className="text-lg font-semibold truncate">
                      {plan.tripTitle || "Untitled Trip"}
                    </CardTitle>
                    <CardDescription className="text-sm text-neutral-300">
                      {plan.destination?.city}, {plan.destination?.country}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-4 text-sm text-neutral-700 space-y-3">
                    <p>
                      <span className="font-medium text-neutral-900">
                        From:
                      </span>{" "}
                      {plan.startingPoint || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium text-neutral-900">
                        Duration:
                      </span>{" "}
                      {plan.durationDays || 0} days
                    </p>

                    {/* Open Details Modal */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="default"
                          className="mt-2 w-full bg-neutral-900 text-white hover:bg-neutral-800"
                          onClick={() => setSelectedTrip(plan)}
                        >
                          View Details
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold">
                            {plan.tripTitle}
                          </DialogTitle>
                          <DialogDescription>
                            {plan.destination?.city},{" "}
                            {plan.destination?.country} · {plan.durationDays}{" "}
                            days trip
                          </DialogDescription>
                        </DialogHeader>

                        {/* Itinerary details */}
                        <div className="space-y-6 mt-4">
                          <h2 className="font-semibold text-lg">
                            🗓️ Itinerary
                          </h2>
                          {plan.itinerary?.map((day) => (
                            <div
                              key={day.day}
                              className="border rounded-md p-4 bg-neutral-50"
                            >
                              <h3 className="font-medium text-neutral-900 mb-2">
                                Day {day.day}: {day.title}
                              </h3>
                              <ul className="list-disc pl-5 space-y-1 text-neutral-700">
                                {day.activities?.map((act, idx) => (
                                  <li key={idx}>
                                    <strong>{act.name}</strong> —{" "}
                                    {act.description}
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

                              {day.hotel?.name && (
                                <div className="mt-3">
                                  🏨 <strong>Hotel:</strong> {day.hotel.name}
                                  {day.hotel.image && (
                                    <img
                                      src={day.hotel.image}
                                      alt={day.hotel.name}
                                      className="mt-2 w-full h-32 rounded object-cover"
                                    />
                                  )}
                                </div>
                              )}

                              {day.meals?.length > 0 && (
                                <div className="mt-3">
                                  🍴 <strong>Meals:</strong>
                                  <ul className="list-disc pl-5 space-y-1">
                                    {day.meals.map((meal, i) => (
                                      <li key={i}>
                                        {meal.name}
                                        {meal.image && (
                                          <img
                                            src={meal.image}
                                            alt={meal.name}
                                            className="mt-2 w-full h-24 rounded object-cover"
                                          />
                                        )}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Recommendations */}
                        <div className="space-y-4 mt-6">
                          <h2 className="font-semibold text-lg">
                            ⭐ Recommendations
                          </h2>
                          <div>
                            <strong>Hotels:</strong>
                            <ul className="list-disc pl-5">
                              {plan.recommendations?.hotels?.map(
                                (hotel, idx) => (
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
                                )
                              )}
                            </ul>
                          </div>
                          <div>
                            <strong>Restaurants:</strong>
                            <ul className="list-disc pl-5">
                              {plan.recommendations?.restaurants?.map(
                                (r, idx) => (
                                  <li key={idx}>
                                    {r.name}
                                    {r.image && (
                                      <img
                                        src={r.image}
                                        alt={r.name}
                                        className="w-full h-28 mt-2 object-cover rounded"
                                      />
                                    )}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                          <div>
                            <strong>Travel Tips:</strong>
                            <ul className="list-disc pl-5">
                              {plan.recommendations?.travelTips?.map(
                                (tip, i) => (
                                  <li key={i}>{tip}</li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </div>
    </LayoutCommon>
  );
}

export default ViewUserAllTrips;
