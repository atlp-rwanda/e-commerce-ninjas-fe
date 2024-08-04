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

const updateUserStatus = async (userId: string, status: string) => {
    const response = await axiosInstance.put(`/api/user/admin-update-user-status/${userId}`, {status});
    return response.data;
}
const getOrderHistory = async () => {
    const response = await axiosInstance.get(`/api/cart/admin-get-order-history`);
    return response.data;
}
const getAllShops = async () => {
    const response = await axiosInstance.get(`/api/shop/admin-get-shops`);
    return response.data;
}




const adminService = {
    getAllUsers,
    getUserById,
    updateUserRole,
    updateUserStatus,
    getOrderHistory,
    getAllShops
}

export default adminService;