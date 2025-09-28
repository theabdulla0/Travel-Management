const Trip = require("../models/trip.model");
const User = require("../models/user.model");
const { ApiResponse } = require("../utils/ApiResponse");

const SaveTrips = async (req, res) => {
  try {
    const { plan } = req.body;
    console.log("SavePlan", plan);
    if (!plan) {
      return res.status(400).json({ message: "Trip details are required" });
    }
    console.log("Save trip before", plan);
    const newTrip = await Trip.create({
      tripDetails: plan,
      createdBy: req.user._id,
    });
    const user = await User.findById(req.user._id);
    user.trips.push(newTrip._id);
    await user.save();
    return res.json(
      new ApiResponse(299, {
        message: "Trip saved successfully",
        trip: newTrip,
      }),
    );
  } catch (error) {
    console.error("Error saving trip:", error);
    return res.json(
      new ApiResponse(500, { error: error.message }, "Server Error"),
    );
  }
};

const ViewAllUserTrips = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const trips = await Trip.find({ createdBy: userId });
    if (!trips) {
      return res.json(new ApiResponse(404, null, "Trip not found"));
    }
    return res.json(new ApiResponse(299, trips, "Server Error"));
  } catch (error) {
    console.error(error);
    return res.json(
      new ApiResponse(500, { error: error.message }, "Server Error"),
    );
  }
};

module.exports = { ViewAllUserTrips, SaveTrips };
