/* eslint-disable */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import notificationService from "./notificationService";
import { INotifications } from "../../../utils/types/store";

const initialState: { notifications: INotifications[] | null; isLoading: boolean; isError: string | null; isSuccess: boolean; message: string } = {
  notifications: null,
  isLoading: false,
  isError: null,
  isSuccess: false,
  message: ''
};

export const fetchNotifications = createAsyncThunk<INotifications[]>("notifications/fetchNotifications", async () => {
  try {
    const notifications = await notificationService.fetchNotifications();
    return notifications;
  } catch (error) {
    throw new Error('Failed to fetch notifications.');
  }
});

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
        state.isSuccess = false;
      })
      .addCase(fetchNotifications.fulfilled, (state, action: PayloadAction<INotifications[]>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = action.payload || 'Failed to fetch notifications.';
        state.isSuccess = false;
      });
  }
});

export default notificationSlice.reducer;
