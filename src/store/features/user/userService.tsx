/* eslint-disable */
import {axiosInstance} from "../../../utils/axios/axiosInstance";

const fetchUserProfile = async()=>{
    try {
        const response  = await axiosInstance.get(`/api/user/user-get-profile`);
        return response.data
    }
    catch(error){
        throw new Error('Failed to fetch user profile.');
    }
}

export const updateUserProfile = async() => {
    try{
        const response = await axiosInstance.put('/api/user/user-update-profile');
        return response.data;
    }
    catch(error){
        throw new Error('Failed to update User')
    }
}

const userService = {
    fetchUserProfile,
    updateUserProfile
}

export default userService