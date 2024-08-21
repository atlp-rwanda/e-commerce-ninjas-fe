/* eslint-disable */
import { axiosInstance } from "../../../utils/axios/axiosInstance";
import { ICollectedData, IProfile } from "../../../utils/types/store";

const fetchUserProfile = async () => {
    try {
        const response = await axiosInstance.get(`/api/user/user-get-profile`);
        return response.data.data.user
    }
    catch (error) {
        throw new Error('Failed to fetch user profile.');
    }
}

export const updateUserProfile = async(formData: FormData): Promise<IProfile> => {
    try {
        const response = await axiosInstance.put('/api/user/user-update-profile',formData);
        return response.data;
    }
    catch (error) {
        console.log(error)
        throw new Error('Failed to update User')
    }
}

const changePassword = async (oldPassword: string, newPassword: string, confirmPassword: string) => {
    const response = await axiosInstance.put(
      `/api/user/change-password`,
      { oldPassword, newPassword, confirmPassword }
    );
    return response.data;
};
const userRequest = async(data:ICollectedData)=>{
        const response = await axiosInstance.post('/api/user/user-submit-seller-request',data);
        return response;
}

const userAddress = async( data: any)=>{
    try {
        const response = await axiosInstance.post('/api/user/user-change-address',data);
        return response.data.data.user;
    }
    catch (error) {
        console.log(error)
        throw new Error('Failed to update User')
    }
}

const userService = {
    fetchUserProfile,
    updateUserProfile,
    changePassword,
    userRequest,
    userAddress
}

export default userService