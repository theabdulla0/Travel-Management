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
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Login
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });

    // Refresh Token
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    });

    // Get Me
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.user = action.payload;
      state.hasFetchedUser = true;
    });
    builder.addCase(getMe.rejected, (state) => {
      state.hasFetchedUser = true;
    });
    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
    });
    builder.addCase(logout.rejected, (state) => {
      state.user = null;
    });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
