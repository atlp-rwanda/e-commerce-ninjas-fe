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

const getAllRequests = async () => {
    const response = await axiosInstance.get(`/api/user/admin-get-users-request`);
    return response.data;
}

const getRequest = async (userRequestId:string) => {
    const response = await axiosInstance.get(`/api/user/admin-get-user-request/${userRequestId}`);
    return response.data;
}

const deleteUserRequest = async (userRequestId:string, requestId:string) =>{
    const response = await axiosInstance.delete(`/api/user/admin-delete-user-request/${userRequestId}/${requestId}`);
    return response.data;
};

const acceptOrRejectRequest = async (userRequestId:string , requestStatus:string) =>{
    const response = await axiosInstance.put(`/api/user/admin-accept-or-reject-request/${userRequestId}`, {requestStatus});
    return response.data;
}

const adminService = {
    getAllUsers,
    getUserById,
    updateUserRole,
    updateUserStatus,
    getOrderHistory,
    getAllShops,
    getAllRequests,
    deleteUserRequest,
    getRequest,
    acceptOrRejectRequest
}

export default adminService;