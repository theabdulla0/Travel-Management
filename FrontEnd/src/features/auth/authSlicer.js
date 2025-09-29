import { createSlice } from "@reduxjs/toolkit";
import {
  signup,
  login,
  refreshToken,
  getMe,
  logout,
  verifyOtp,
  sendOtp,
  reset_password,
} from "./authThunk";

const initialState = {
  user: null,
  loading: false,
  error: null,
  otpSent: false,
  otpVerified: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    },
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
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
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
        state.accessToken = action.payload.data.accessToken;
        state.refreshToken = action.payload.data.refreshToken;
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
      })
      .addCase(logout.rejected, (state) => {
        state.user = null;
      })

      // --- OTP flow ---
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpVerified = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(reset_password.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reset_password.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = false;
        state.otpVerified = false;
      })
      .addCase(reset_password.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setUserData } = authSlice.actions;
export default authSlice.reducer;
