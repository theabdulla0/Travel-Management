import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/auth";

// Signup
export const signup = createAsyncThunk(
  "auth/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await API.post("/signup", formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Signup failed");
    }
  }
);

// Login
export const login = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await API.post("/login", formData);
      console.log(res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// Get Current User
export const getMe = createAsyncThunk(
  "auth/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/me");

      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch user");
    }
  }
);

// Logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await API.post("/logout");
      return true;
    } catch (err) {
      return rejectWithValue("Logout failed");
    }
  }
);

export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async ({ email }, { rejectWithValue }) => {
    try {
      const res = await API.post("/send-otp", { email });
      return res.data;
    } catch (err) {
      // Handle both string and object error messages
      const errorMessage =
        typeof err.response?.data?.message === "string"
          ? err.response?.data?.message
          : err.response?.data?.message?.error || "Failed to send OTP";
      return rejectWithValue(errorMessage);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const res = await API.post("/verify-otp", { email, otp });

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to verify OTP"
      );
    }
  }
);

export const reset_password = createAsyncThunk(
  "auth/reset_password",
  async ({ email, oldPassword, password }, { rejectWithValue }) => {
    try {
      const res = await API.post("/reset-password", {
        email,
        oldPassword,
        password,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to reset password"
      );
    }
  }
);
