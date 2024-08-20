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
const deleteUser = async (userId: string) => {
    const response = await axiosInstance.delete(`/api/user/admin-delete-user/${userId}`);
    return response.data;
};
const getOrderHistory = async () => {
    const response = await axiosInstance.get(`/api/cart/admin-get-order-history`);
    return response.data;
}
const getAllShops = async () => {
    const response = await axiosInstance.get(`/api/shop/admin-get-shops`);
    return response.data;
}

const updatePasswordExpiration = async (minutes: number) => {
    const response = await axiosInstance.put('/api/user/admin-update-password-expiration', { minutes });
    return response.data;
};
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
const getPasswordExpiration = async () => {
    const response = await axiosInstance.get('/api/user/admin-get-password-expiration');
    return response.data;
};
const getTerms = async () => {
    const response = await axiosInstance.get('/api/user/user-get-terms');
    return response.data;
}
const setTerms = async (type:string,content:string) => {
    const response = await axiosInstance.post('/api/user/admin-set-terms',{type,content});
    return response.data;
}

const getTerm = async (id:string) => {
    const response = await axiosInstance.get(`/api/user/admin-get-terms/${id}`);
    return response.data;
}
const updateTerm = async (id:string,type:string,content:string) =>{
    const response = await axiosInstance.put(`/api/user/admin-update-terms/${id}`,{type,content});
    return response.data;
}

const deleteTerm = async (id:string) =>{
    const response = await axiosInstance.delete(`/api/user/admin-delete-terms/${id}`);
    return response.data;
}

const adminService = {
    getAllUsers,
    getUserById,
    updateUserRole,
    updateUserStatus,
    getOrderHistory,
    getAllShops,
    updatePasswordExpiration,
    getPasswordExpiration,
    getAllRequests,
    deleteUserRequest,
    getRequest,
    acceptOrRejectRequest,
    getTerms,
    setTerms,
    getTerm,
    updateTerm,
    deleteTerm,
    deleteUser
}

export default adminService;