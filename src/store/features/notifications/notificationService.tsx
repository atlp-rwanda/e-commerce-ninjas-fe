/* eslint-disable  */
import { axiosInstance } from '../../../utils/axios/axiosInstance';

const getUserNotifications = async () => {
  try {
    const response = await axiosInstance.get('/api/user/user-get-notifications');
    return response.data.data.notifications; 
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
};

const notificationService = {
  getUserNotifications,
};

export default notificationService;