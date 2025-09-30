import React, { useState, useEffect } from "react";
import LayoutCommon from "../../components/common/LayoutCommon";
import TripChatBot from "../../components/trips/TripChatBot";
import EmptyBoxState from "@/components/trips/EmptyBoxState";
import ViewTrip from "./ViewTrip";

function CreateTrip() {
  const [tripPlan, setTripPlan] = useState(null);

  return (
    <LayoutCommon>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-10">
        <div>
          <EmptyBoxState />
          <TripChatBot setTripPlan={setTripPlan} />
        </div>
        <div>
          <ViewTrip trip={tripPlan?.tripDetails} />
        </div>
      </div>
    </LayoutCommon>
  );
}

export default CreateTrip;
