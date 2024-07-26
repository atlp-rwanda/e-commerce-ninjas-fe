/* eslint-disable */
import { axiosInstance } from '../../../utils/axios/axiosInstance';

const getUserNotifications = async () => {
  try {
    const response = await axiosInstance.get('/api/user/user-get-notifications');
    return response.data.data.notifications; 
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
};

const markAllNotificationsAsRead = async () => {
  try {
    await axiosInstance.put('/api/user/user-mark-all-notifications');
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
  }
};

const markNotificationAsRead = async (id: string) => {
  try {
    await axiosInstance.put(`/api/user/user-mark-notification/${id}`);
  } catch (error) {
    console.error(`Error marking notification ${id} as read:`, error);
  }
};

const notificationService = {
  getUserNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
};

export default notificationService;