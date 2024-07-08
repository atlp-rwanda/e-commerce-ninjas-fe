/* eslint-disable */
import { createSlice,createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { IWelcomeMessage, IWelcomeMessageState } from '../../utils/types/store';
import welcomeService from './welcomeService';

const initialState: IWelcomeMessageState = {
  welcomeMessage: { status: false, message: "" },
};


export const loadWelcomeMessage = createAsyncThunk<IWelcomeMessage, void, { rejectValue: string }>(
  'welcomeMessage/loadWelcomeMessage',
  async (_, thunkApi) => {
    try {
      return await welcomeService.welcome();
    } catch (error) {
      let errorMessage = 'An unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

export const WelcomeSlice = createSlice({
  name: "welcomeMessage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadWelcomeMessage.pending, (state) => {
        state.welcomeMessage = { status: false, message: "Loading..." };
      })
      .addCase(
        loadWelcomeMessage.fulfilled,
        (state, action: PayloadAction<IWelcomeMessage>) => {
          state.welcomeMessage = action.payload;
        }
      )
      .addCase(loadWelcomeMessage.rejected, (state) => {
        state.welcomeMessage = {
          status: false,
          message: "Failed to load welcome message.",
        };
      });
  },
});

export default WelcomeSlice.reducer;