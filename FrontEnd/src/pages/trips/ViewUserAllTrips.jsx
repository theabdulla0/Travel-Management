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
import { toast } from "sonner";
import TripModal from "@/components/common/TripModal";

function ViewUserAllTrips() {
  const dispatch = useDispatch();
  const { tripPlan, loading, error } = useSelector((state) => state.trip);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        let res = await dispatch(ViewTrips()).unwrap();
        if (res.success) {
          toast.success(res.message);
        }
      } catch (err) {
        toast.error(err.error?.message, "Error fetching trips:");
      }
    };
    fetchTrips();
  }, [dispatch]);
  const trips = tripPlan?.data || tripPlan || [];
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

          {!loading && !error && trips?.length === 0 && (
            <div className="col-span-full flex justify-center mt-10">
              <p className="text-gray-500 text-lg">No trips found yet. 🚀</p>
            </div>
          )}

          {!loading &&
            !error &&
            trips?.map((trip) => {
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
                    <TripModal trip={trip} />
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
