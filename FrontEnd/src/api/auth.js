import axios from "axios";
// import { store } from "../app/store";
import { logout } from "../features/auth/authThunk";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/auth`,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach(({ reject }) => reject(error));
  failedQueue = [];
};

API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((_, reject) => {
          failedQueue.push({ reject });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await API.post("/refresh-token");
        isRefreshing = false;
        return API(originalRequest);
      } catch (refreshError) {
        dispatch(logout());
        window.location.href = "/";
        isRefreshing = false;
        processQueue(refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
