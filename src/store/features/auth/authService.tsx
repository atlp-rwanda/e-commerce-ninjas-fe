/* eslint-disable */
import { axiosInstance } from "../../../utils/axios/axiosInstance";
import { IEmail, IUser, IVerification } from "../../../utils/types/store";
import { URL } from "../../../utils/axios/axiosInstance";

const register = async (userData: IUser) => {
  const response = await axiosInstance.post<IUser>(
    "/api/auth/register",
    userData
  );
  return response.data;
};

const login = async (userData: IUser) => {
  const response = await axiosInstance.post<IUser>("/api/auth/login", userData);
  return response.data;
};

const logout = async() => {
  const response = await axiosInstance.post("/api/auth/logout");
  return response.data;
}

const fetchUserDetails = async (token: string) => {
  const response = await axiosInstance.get("/api/user/user-get-profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const verify = async (token: string) => {
  const response = await axiosInstance.get<IVerification>(
    `/api/auth/verify-email/${token}`
  );
  return response.data;
};

const resendVerificationEmail = async (email: IEmail) => {
  const response = await axiosInstance.post<IEmail>(
    `/api/auth/send-verify-email`,
    email
  );
  return response.data;
};

const googleAuth = async () => {
  window.location.href = `${URL}/api/auth/google`;
};

const googleAuthCallback = async (data: any) => {
  const response = await axiosInstance.get(
    `/api/auth/google/callback?code=${data.code}&scope=${data.scope}&authuser=${data.authuser}&prompt=${data.prompt}`
  );
  return response.data;
};

const sendResetLink = async (email: string) => {
  const response = await axiosInstance.post("api/auth/forget-password", {
    email,
  });
  return response.data.message;
};

const resetPassword = async (token: string, password: string) => {
  const response = await axiosInstance.put(
    `/api/auth/reset-password/${token}`,
    { password }
  );
  return response.data;
};

const verifyOTP = async (userId: string, otp: string) => {
  const response = await axiosInstance.post(
    `/api/auth/verify-otp/${userId}`,
    { otp }
  );
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  verify,
  fetchUserDetails,
  resendVerificationEmail,
  googleAuth,
  googleAuthCallback,
  sendResetLink,
  resetPassword,
  verifyOTP,
};

export default authService;
