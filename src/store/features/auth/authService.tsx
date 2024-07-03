/* eslint-disable */
import {axiosInstance} from "../../../utils/axios/axiosInstance";
import { IUser, IVerification } from "../../../utils/types/store";

const register = async(userData: IUser) =>{
    const response = await axiosInstance.post<IUser>('/api/auth/register', userData);
    return response.data;
}

const verify = async(token:string) =>{
    const response = await axiosInstance.get<IVerification>(`/api/auth/verify-email/${token}`);
    return response.data;
}

const googleAuth = async() =>{
    const response = await axiosInstance.post('/api/auth/google');
    return response.data;
}

const googleAuthCallback = async(data:any) =>{
    const response = await axiosInstance.get(`/api/auth/google/callback?code=${data.code}&scope=${data.scope}&authuser=${data.authuser}&prompt=${data.prompt}`);
    return response.data;
}

const authService = {
    register,
    verify,
    googleAuth,
    googleAuthCallback,

}

export default authService;