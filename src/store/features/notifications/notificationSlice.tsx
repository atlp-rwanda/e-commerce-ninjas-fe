/* eslint-disable */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import notificationService from './notificationService';
import { INotificationInitialResource } from '../../../utils/types/store';
import { getErrorMessage } from '../../../utils/axios/axiosInstance';
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

const initialState: NotificationState & INotificationInitialResource = {
  notifications: [],
  passwordExpiryMessage: null,
  isLoggedOut: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
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
  reducers: {},
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

export default notificationSlice.reducer;
