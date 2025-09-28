import { createSlice } from "@reduxjs/toolkit";
import { AiGenerateTrip, SaveTrip, ViewTrips } from "./tripThunk";

const initialState = {
  tripPlan: null,
  saveStatus: null,
  loading: false,
  error: null,
};

const tripSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ViewTrips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ViewTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.tripPlan = action.payload;
      })
      .addCase(ViewTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // AiGenerateTrip
      .addCase(AiGenerateTrip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AiGenerateTrip.fulfilled, (state, action) => {
        state.loading = false;
        state.tripPlan = action.payload;
        console.log("AiTripSlice", action.payload);

      })
      .addCase(AiGenerateTrip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // save trip
      .addCase(SaveTrip.pending, (state) => {
        state.saveStatus = "saving";
      })
      .addCase(SaveTrip.fulfilled, (state, action) => {
        state.saveStatus = "saved";
      })
      .addCase(SaveTrip.rejected, (state, action) => {
        state.saveStatus = "failed";
        state.error = action.payload;
      });
  },
});

export default tripSlice.reducer;
