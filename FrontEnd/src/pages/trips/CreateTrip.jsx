import React from "react";
import LayoutCommon from "../../components/common/LayoutCommon";
import TripChatBot from "../../components/trips/TripChatBot";
import EmptyBoxState from "@/components/trips/EmptyBoxState";

function CreateTrip() {
  return (
    <LayoutCommon>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-10">
        <div>
        <EmptyBoxState />
          <TripChatBot />
        </div>
        <div>Trip Details</div>
      </div>
    </LayoutCommon>
  );
}

export default CreateTrip;
