/* eslint-disable */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';
import notificationService from './notificationService';
import { INotificationInitialResource } from '../../../utils/types/store';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../utils/axios/axiosInstance';

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

const initialState: INotificationInitialResource = {
  notifications: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  passwordExpiryMessage: null,
  isLoggedOut: false,
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, thunkApi) => {
    try {
      const notifications = await notificationService.getUserNotifications();
      return notifications;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const markAllNotificationsRead = createAsyncThunk(
  "notifications/markAllNotificationsRead",
  async (_, thunkApi) => {
    try {
      await notificationService.markAllNotificationsAsRead();
      return;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const markNotificationRead = createAsyncThunk(
  "notifications/markNotificationRead",
  async (id: string, thunkApi) => {
    try {
      await notificationService.markNotificationAsRead(id);
      return id;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

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
      const notifications = action.payload || [];
      const passwordExpiryNotifications = notifications.filter(notification =>
        notification.message.includes('your password has expired')
      );

      const passwordUpdateNotifications = notifications.filter(notification =>
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
        localStorage.removeItem('token');
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = '';
      })
      .addCase(fetchNotifications.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notifications = action.payload;
        state.message = "Notifications fetched successfully";
      })
      .addCase(fetchNotifications.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(markAllNotificationsRead.fulfilled, (state) => {
        state.notifications.forEach(notification => notification.isRead = true);
      })
      .addCase(markNotificationRead.fulfilled, (state, action: PayloadAction<string>) => {
        const notificationId = action.payload;
        const notification = state.notifications.find(notification => notification.id === notificationId);
        if (notification) {
          notification.isRead = true;
        }
      });
  }
});

export const { addNotification, setPasswordExpiryMessage, setLoggedOut, checkPasswordExpiryAndLogout } = notificationSlice.actions;

export const handleNotifications = () => async (dispatch: AppDispatch) => {
  const notifications = await notificationService.getUserNotifications();
  const safeNotifications = notifications || []; 
  if (safeNotifications.length > 0) {
    safeNotifications.forEach((notification: Notification) => {
      dispatch(addNotification(notification));
    });
    dispatch(checkPasswordExpiryAndLogout(safeNotifications));
  }
  return safeNotifications;
};

export default notificationSlice.reducer;
