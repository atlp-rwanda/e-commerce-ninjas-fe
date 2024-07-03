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

const authService = {
    register,
    verify,

}

export default authService;