/* eslint-disable */
import axios from "axios";
import { getToken } from "../protectRoute/ProtectedRoute";
export const URL = "https://e-commerce-ninjas-platform-backend.onrender.com";
// export const URL = "http://localhost:5001";
const axiosInstance = axios.create({
  baseURL: `${URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const getErrorMessage = (msg: unknown): string => {
  if (axios.isAxiosError(msg) && msg.response) {
    return msg.response.data.message || msg.response.data.error;
  }
  return "An unknown error occurred";
};

export { axiosInstance, getErrorMessage };