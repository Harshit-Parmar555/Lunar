import axios from "axios";

const isDevelopment = import.meta.env.VITE_ENV === "development";

// Set baseURL based on environment
const baseURL = isDevelopment
  ? "http://localhost:4000/api/v1"
  : import.meta.env.VITE_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: baseURL,
});
axiosInstance.defaults.withCredentials = true;
