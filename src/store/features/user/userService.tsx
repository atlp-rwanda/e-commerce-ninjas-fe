/* eslint-disable */
import { axiosInstance } from "../../../utils/axios/axiosInstance";
import { IProfile } from "../../../utils/types/store";


// const fetchUserProfile = async (token: string) => {
//     const response = await axiosInstance.get("/api/user/user-get-profile", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
//   };
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

export const updateUserProfile = async(formData: FormData): Promise<IProfile> => {
    try {
        const response = await axiosInstance.put('/api/user/user-update-profile',formData);
        console.log("response",response)
        return response.data.data.user;
    }
    catch (error) {
        console.log(error)
        throw new Error('Failed to update User')
    }
}

const fetchAndUpdatePassword = async(password: string)=>{
    try{
        const response = await axiosInstance.put('api/user/change-password',password)
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