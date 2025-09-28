import { createAsyncThunk } from "@reduxjs/toolkit";
import TripAPI from "../../api/tripAPI";

export const ViewTrips = createAsyncThunk(
  "trips/ViewTrips",
  async (_, { rejectWithValue }) => {
    try {
      const res = await TripAPI.get("/");
      return res.data.data || res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "failed to fetch trip data"
      );
    }
  }
);

export const AiGenerateTrip = createAsyncThunk(
  "trips/AiGenerateTrip",
  async (allAnswers, { rejectWithValue }) => {
    try {
      const res = await TripAPI.post("/ai", { plan: allAnswers });
      console.log(res.data.data);
      return res.data.data || res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "failed to fetch trip data"
      );
    }
  }
);

export const SaveTrip = createAsyncThunk(
  "trips/SaveTrip",
  async (tripPlan, { rejectWithValue }) => {
    try {
      const res = await TripAPI.post("/save-trip", { plan: tripPlan });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to save trip"
      );
    }
  }
);
