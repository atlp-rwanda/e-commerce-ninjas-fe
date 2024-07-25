/* eslint-disable */
import { axiosInstance } from "../../../utils/axios/axiosInstance";


const getAllUsers = async () =>{
    const response = await axiosInstance.get('/api/user/admin-get-users');
    return response.data;
}

const getUserById = async (userId: string) => {
    const response = await axiosInstance.get(`/api/user/admin-get-user/${userId}`);
    return response.data;
}

const updateUserRole = async (userId: string, role: string) => {
    const response = await axiosInstance.put(`/api/user/admin-update-user-role/${userId}`, {role});
    return response.data;
}

const adminService = {
    getAllUsers,
    getUserById,
    updateUserRole,
}

export default adminService;