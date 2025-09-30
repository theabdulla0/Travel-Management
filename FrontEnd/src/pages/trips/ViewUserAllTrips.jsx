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
import Loader from "@/components/common/Loader";

function ViewUserAllTrips() {
  const dispatch = useDispatch();
  const { tripPlan, loading, error } = useSelector((state) => state.trip);

  useEffect(() => {
    dispatch(ViewTrips());
  }, [dispatch]);

  return (
    <LayoutCommon>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && (
          <div className="col-span-full flex flex-col items-center justify-center mt-10">
            <Loader className="w-12 h-12" />
          </div>
        )}

        {error && !loading && (
          <div className="col-span-full flex flex-col items-center justify-center mt-10">
            <p className="text-red-500 text-lg font-medium">Error: {error}</p>
          </div>
        )}

        {!loading && !error && tripPlan?.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center mt-10">
            <p className="text-gray-400 text-lg font-medium">No trips found.</p>
          </div>
        )}

        {!loading &&
          !error &&
          tripPlan?.map((trip) => (
            <Card
              key={trip._id}
              className="shadow-lg hover:shadow-2xl transition duration-300"
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {trip.tripDetails?.tripTitle || "Untitled Trip"}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  From: {trip.tripDetails?.startingPoint || "N/A"} <br />
                  To:{" "}
                  {`${trip.destination?.city || "N/A"}, ${
                    trip.destination?.country || "N/A"
                  }`}{" "}
                  <br />
                  Duration: {trip.tripDetails?.durationDays || 0} days
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gray-700 space-y-2">
                {trip.tripDetails?.itinerary?.map((day) => (
                  <div
                    key={day.day}
                    className="border rounded-md p-2 hover:bg-gray-50 transition"
                  >
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
