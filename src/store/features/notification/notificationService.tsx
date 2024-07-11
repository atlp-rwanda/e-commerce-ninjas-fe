/* eslint-disable */
import {axiosInstance} from "../../../utils/axios/axiosInstance";

const fetchNotifications = async () => {

    const response = await axiosInstance.get(`/api/user/user-get-notifications`);
    return response.data;
};

const notificationService = {
  fetchNotifications,
};

export default notificationService;
