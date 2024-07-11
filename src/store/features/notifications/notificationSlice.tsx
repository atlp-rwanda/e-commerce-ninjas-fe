/* eslint-disable */
// src\store\features\notifications\notificationSlice.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';
import notificationService from './notificationService';
import { toast } from 'react-toastify';

interface Notification {
  id: string;
  userId: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

interface NotificationState {
  notifications: Notification[];
  passwordExpiryMessage: string | null;
  isLoggedOut: boolean;
}

const initialState: NotificationState = {
  notifications: [],
  passwordExpiryMessage: null,
  isLoggedOut: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload);
    },
    setPasswordExpiryMessage: (state, action: PayloadAction<string>) => {
      state.passwordExpiryMessage = action.payload;
    },
    setLoggedOut: (state) => {
      state.isLoggedOut = true;
    },
    checkPasswordExpiryAndLogout: (state, action: PayloadAction<Notification[]>) => {
      const passwordExpiryNotifications = action.payload.filter(notification =>
        notification.message.includes('your password has expired')
      );

      const passwordUpdateNotifications = action.payload.filter(notification =>
        notification.message.includes('Password changed successfully')
      );

      const latestPasswordExpiryNotification = passwordExpiryNotifications.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0];

      const latestPasswordUpdateNotification = passwordUpdateNotifications.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0];

      if (latestPasswordExpiryNotification && (!latestPasswordUpdateNotification || 
        new Date(latestPasswordExpiryNotification.createdAt).getTime() > new Date(latestPasswordUpdateNotification.createdAt).getTime())) {
        state.isLoggedOut = true;
        toast.error('Your password has expired. Reset your password and login again');
      }
    },
  },
});

export const { addNotification, setPasswordExpiryMessage, setLoggedOut, checkPasswordExpiryAndLogout } = notificationSlice.actions;

export const handleNotifications = () => async (dispatch: AppDispatch) => {
  const notifications = await notificationService.getUserNotifications();
  if (notifications) {
    notifications.forEach((notification: Notification) => {
      dispatch(addNotification(notification));
    });
    dispatch(checkPasswordExpiryAndLogout(notifications));
  }
};

export default notificationSlice.reducer;
