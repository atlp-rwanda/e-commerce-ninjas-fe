/* eslint-disable */
import {axiosInstance} from "../../../utils/axios/axiosInstance";

const fetchNotifications = async () => {
  try {
    const response = await axiosInstance.get(`/api/user/user-get-notifications`);
    return response.data.data.notifications;
  } catch (error) {
    throw new Error('Failed to fetch notifications.');
  }
};

const notificationService = {
  fetchNotifications,
};

export default notificationService;
