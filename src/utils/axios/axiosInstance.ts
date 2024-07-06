/* eslint-disable */
import axios from 'axios';
export const URL = "https://e-commerce-ninjas-platform-backend.onrender.com"
const axiosInstance = axios.create({
  baseURL: `${URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const getErrorMessage = (msg: unknown): string => {
  if (axios.isAxiosError(msg) && msg.response) {
    return msg.response.data.message || msg.response.data.error;
  }
  return 'An unknown error occurred';
};

export { axiosInstance, getErrorMessage };
