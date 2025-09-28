import { createSlice } from "@reduxjs/toolkit";
import { signup, login, refreshToken, getMe, logout } from "./authThunk";

const initialState = {
  user: null,
  loading: false,
  hasFetchedUser: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Signup
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Refresh Token
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })

      // Get Me
      .addCase(getMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.hasFetchedUser = true;
      })
      .addCase(getMe.rejected, (state) => {
        state.hasFetchedUser = true;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.hasFetchedUser = true;
      })
      .addCase(logout.rejected, (state) => {
        state.user = null;
        state.hasFetchedUser = true;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
