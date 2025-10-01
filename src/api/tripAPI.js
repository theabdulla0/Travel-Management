import axios from "axios";

const TripAPI = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/trip`,
  withCredentials: true,
});

export default TripAPI;
