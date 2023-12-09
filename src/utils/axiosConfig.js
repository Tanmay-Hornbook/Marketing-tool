import axios from "axios";
import { API_URL } from "../config";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  let token = localStorage.getItem("accessToken");

  if (token) {
     config.headers['Authorization'] = token;   
  }

  return config;
});

export default axiosInstance;