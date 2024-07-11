/* eslint-disable */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import notificationService from "./notificationService";
import { INotificationInitialResource } from "../../../utils/types/store";
import { getErrorMessage } from '../../../utils/axios/axiosInstance';

const initialState: INotificationInitialResource = {
  notifications: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ''
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, thunkApi) => {
    try {
      const notifications = await notificationService.fetchNotifications();
      return notifications.data;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
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
        state.notifications = action.payload.notifications;
        state.message = "Notifications fetched successfully";
      })
      .addCase(fetchNotifications.rejected, (state, action:PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  }
});

export default notificationSlice.reducer;
