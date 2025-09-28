import { createSlice } from "@reduxjs/toolkit";
import { ViewTrips } from "./tripThunk";

const initialState = {
  trip: [],
  loading: false,
  error: null,
};

const tripSlice = createSlice({
  name: "trip",
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
        state.trip = action.payload;
      })
      .addCase(ViewTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tripSlice.reducer;
