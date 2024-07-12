/* eslint-disable */
import { axiosInstance } from "../../../utils/axios/axiosInstance";

const fetchUserProfile = async () => {
    try {
        console.log("1")
        const response = await axiosInstance.get(`/api/user/user-get-profile`);
        console.log(response)
        return response.data.data.user
    }
    catch (error) {
        throw new Error('Failed to fetch user profile.');
    }
}

export const updateUserProfile = async () => {
    try {
        const response = await axiosInstance.put('/api/user/user-update-profile');
        return response.data.data.user;
    }
    catch (error) {
        throw new Error('Failed to update User')
    }
}

const fetchAndUpdatePassword = async(id: string, password: string)=>{
    try{
        const response = await axiosInstance.put('api/user/change-password',
            {
               id, password 
            }
        )
        console.log(response)
        return response.data.password
    }
    catch(error){
        throw new Error("failed to update password")
    }
}

const userService = {
    fetchUserProfile,
    updateUserProfile,
    fetchAndUpdatePassword
}

export default userService