import axios from "axios";

const TripAPI = axios.create({
  baseURL: "http://localhost:3000/api/trip",
  withCredentials: true,
});

export default TripAPI;
