import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlicer";
import tripReducer from "../features/trips/tripSlicer";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    trip: tripReducer,
  },
});
