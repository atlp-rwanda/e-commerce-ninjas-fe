/* eslint-disable linebreak-style */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios/axiosInstance';
import type { IWelcomeMessage, IWelcomeMessageState } from '../../utils/types/store';

const initialState: IWelcomeMessageState = {
  welcomeMessage: { status: false, message: '' }
};

export const loadWelcomeMessage = createAsyncThunk<IWelcomeMessage>(
  'welcomeMessage/loadWelcomeMessage',
  async () => {
    const response = await axiosInstance.get<IWelcomeMessage>('/');
    return response.data;
  }
);

export const WelcomeSlice = createSlice({
  name: 'welcomeMessage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadWelcomeMessage.pending, (state) => {
        state.welcomeMessage = { status: false, message: 'Loading...' };
      })
      .addCase(loadWelcomeMessage.fulfilled, (state, action: PayloadAction<IWelcomeMessage>) => {
        state.welcomeMessage = action.payload;
      })
      .addCase(loadWelcomeMessage.rejected, (state) => {
        state.welcomeMessage = { status: false, message: 'Failed to load welcome message.' };
      });
  },
});

export default WelcomeSlice.reducer;
