import axios from "axios";
import { API_URL } from "../config";
import { getAccessToken } from "./Utils";
import { storeAccessToken } from "./Utils";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let token = await getAccessToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axiosInstance.post("api/auth/refresh-token", refreshToken);
        console.log("console_response", response);
        storeAccessToken(response.data);
        return axiosInstance(originalRequest);
      } catch (error) {
        console.log("console_error", error);
        return Promise.reject(error);
      }
    }
  }
);
export default axiosInstance;
