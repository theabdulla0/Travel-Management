import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ViewTrips } from "../../features/trips/tripThunk";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import LayoutCommon from "../../components/common/LayoutCommon";

function ViewUserAllTrips() {
  const dispatch = useDispatch();
  const { trip, loading, error } = useSelector((state) => state.trip);

  useEffect(() => {
    dispatch(ViewTrips());
  }, [dispatch]); // Only run once on mount

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading trips...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;
  }

  if (!trip || trip.length === 0) {
    return <p className="text-center mt-10 text-gray-500">No trips found.</p>;
  }

  return (
    <LayoutCommon>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trip.map((trip) => (
          <Card key={trip._id} className="shadow-lg hover:shadow-xl transition">
            <CardHeader>
              <CardTitle>
                {trip.tripDetails?.tripTitle || "Untitled Trip"}
              </CardTitle>
              <CardDescription>
                From: {trip.tripDetails?.startingPoint || "N/A"} <br />
                To: {`${trip.destination?.city}, ${trip.destination?.country}`}{" "}
                <br />
                Duration: {trip.tripDetails?.durationDays || 0} days
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-2">
              {trip.tripDetails?.itinerary?.map((day) => (
                <div key={day.day} className="border rounded-md p-2">
                  <strong>Day {day.day}:</strong> {day.title}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </LayoutCommon>
  );
}

export default ViewUserAllTrips;
