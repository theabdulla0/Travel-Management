import { createAsyncThunk } from "@reduxjs/toolkit";
import TripAPI from "../../api/tripAPI";

export const ViewTrips = createAsyncThunk(
  "trips/ViewTrips",
  async (_, { rejectWithValue }) => {
    try {
      const res = await TripAPI.get("/", {
        withCredentials: true,
      });
      console.log(res.data.data);
      return res.data.data || res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "failed to fetch trip data"
      );
    }
  }
);
