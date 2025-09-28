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

// Refresh Token
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (refreshToken, { rejectWithValue }) => {
    try {
      const res = await API.post("/refresh-token", { token: refreshToken });
      return res.data;
    } catch (err) {
      return rejectWithValue("Token refresh failed");
    }
  }
);

// Get Current User
export const getMe = createAsyncThunk(
  "auth/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/me");
      console.log("getme", res.data);
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
      await API.post("/logout", { withCredentials: true });
      return true;
    } catch (err) {
      return rejectWithValue("Logout failed");
    }
  }
);

export const forgot_password = createAsyncThunk(
  "auth/forgot_password",
  async (email, { rejectWithValue }) => {
    try {
      const res = await API.post("/forgot-password", email);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const reset_password = createAsyncThunk(
  "auth/reset_password",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await API.post("/reset-password", formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);
