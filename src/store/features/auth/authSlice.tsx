/* eslint-disable */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authService from "./authService";
import {AuthService, IEmail, IUser,IUserData } from "../../../utils/types/store";
import {getErrorMessage} from '../../../utils/axios/axiosInstance'
const initialState:AuthService= {
    user: undefined,
    isError: false,
    isLoading: false,
    isSuccess: false,
    isVerified: false,
    message: ""
};

export const registerUser = createAsyncThunk("auth/register", async (userData: IUser, thunkApi) => {
    try {
        const response = await authService.register(userData);
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(getErrorMessage(error));
    }
});

export const verifyEmail = createAsyncThunk("auth/verify-email", async(token:string, thunkApi)=>{
    try {
        const response = await authService.verify(token);
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(getErrorMessage(error));
    }
})

export const resendVerificationEmail = createAsyncThunk("auth/resend-verification-email", async(email:IEmail, thunkApi)=>{
    try {
        const response = await authService.resendVerificationEmail(email);
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(getErrorMessage(error));
    }
})
export const sendResetLink = createAsyncThunk('auth/forgot-password', async (userEmail: string, thunkApi) => {
  try {
    const response = await authService.sendResetLink(userEmail);
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const resetPassword = createAsyncThunk('auth/reset-password',async ({ token, password }: { token: string; password: string }, thunkApi) => {
    try {
      const response = await authService.resetPassword(token, password);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);


export const googleAuth = createAsyncThunk("auth/google", async(_,thunkApi) => {
    try {
        const response = await authService.googleAuth();
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(getErrorMessage(error));
    }
})

export const googleAuthCallback = createAsyncThunk('auth/googleAuthCallback', async(data:any, thunkApi) => {
    try {
        const response = await authService.googleAuthCallback(data);
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(getErrorMessage(error));
    }
})

const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action:PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(verifyEmail.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(verifyEmail.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(verifyEmail.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(resendVerificationEmail.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(resendVerificationEmail.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(resendVerificationEmail.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(googleAuth.pending, (state) => {
                state.isLoading = true;

            })
            .addCase(googleAuth.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isAuthenticated = true;
            })
            .addCase(googleAuth.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(googleAuthCallback.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(googleAuthCallback.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.message = action.payload.message;
            })
            .addCase(googleAuthCallback.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(sendResetLink.pending, (state) => {
              state.isLoading = true;
              state.isError = false;
              state.isSuccess = false;
            })
            .addCase(sendResetLink.fulfilled, (state, action: PayloadAction<any>) => {
              state.isLoading = false;
              state.isSuccess = true;
              state.message = action.payload;
            })
            .addCase(sendResetLink.rejected, (state, action:PayloadAction<any>) => {
              state.isLoading = false;
              state.isSuccess = false;
              state.isError = true;
              state.message = action.payload;
            })
            .addCase(resetPassword.pending, (state) => {
              state.isLoading = true;
              state.isError = false;
              state.isSuccess = false;
            })
            .addCase(resetPassword.fulfilled, (state, action: PayloadAction<any>) => {
              state.isLoading = false;
              state.isSuccess = true;
              state.user = action.payload;
              state.message = action.payload.message;
            })
            .addCase(resetPassword.rejected, (state, action:PayloadAction<any>) => {
              state.isLoading = false;
              state.isSuccess = false;
              state.isError = true;
              state.message = action.payload;
            }); 
            
    },
});

export default userSlice.reducer;
