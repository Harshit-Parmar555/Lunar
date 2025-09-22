import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1",
});
axiosInstance.defaults.withCredentials = true;