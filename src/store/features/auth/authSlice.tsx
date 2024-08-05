/* eslint-disable */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authService from "./authService";
import { AuthService, IEmail, IUser, IUserData, IUserDataState} from "../../../utils/types/store";
import { getErrorMessage } from "../../../utils/axios/axiosInstance";
import { toast } from "react-toastify";

import { resetState, RESET_STATE } from "../../actions/resetAction";
const initialState: AuthService = {
  user: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  isVerified: false,
  message: "",
  token: "",
  isAuthenticated: false,
  error: "",
  userId: "",
  fail: false
};

type IUserEmailAndPassword = Pick<IUser, 'email' | 'password'>;

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: IUserEmailAndPassword, thunkApi) => {
    try {
      const response = await authService.register(userData);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData: IUser, thunkApi) => {
    try {
      const response = await authService.login(userData);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "auth/getUserDetails",
  async (token: string, thunkApi) => {
    try {
      const response = await authService.fetchUserDetails(token);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verify-email",
  async (token: string, thunkApi) => {
    try {
      const response = await authService.verify(token);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const resendVerificationEmail = createAsyncThunk(
  "auth/resend-verification-email",
  async (email: IEmail, thunkApi) => {
    try {
      const response = await authService.resendVerificationEmail(email);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);
export const sendResetLink = createAsyncThunk(
  "auth/forgot-password",
  async (userEmail: string, thunkApi) => {
    try {
      const response = await authService.sendResetLink(userEmail);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async (
    { token, password }: { token: string; password: string },
    thunkApi
  ) => {
    try {
      const response = await authService.resetPassword(token, password);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const googleAuth = createAsyncThunk(
  "auth/google",
  async (_, thunkApi) => {
    try {
      const response = await authService.googleAuth();
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const googleAuthCallback = createAsyncThunk(
  "auth/googleAuthCallback",
  async (data: any, thunkApi) => {
    try {
      const response = await authService.googleAuthCallback(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    const response = await authService.logout();
    thunkApi.dispatch(resetState());
    return response
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const verifyOTP = createAsyncThunk(
  "auth/verify-otp",
  async (
    { userId, otp }: { userId: string; otp: string },
    thunkApi
  ) => {
    try {
      const response = await authService.verifyOTP(userId, otp);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const change2FAStatus = createAsyncThunk(
  "auth/change-2fa-status",
  async (
    { newStatus }: { newStatus: boolean },
    thunkApi
  ) => {
    try {
      const response = await authService.change2FAStatus(newStatus);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.user = undefined;
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.isVerified = false;
      state.message = "";
      state.token = "";
      state.isAuthenticated = false;
      state.error = "";
      state.fail= false;
    },
    changingProfile: (state, action: any)=>{
      (state.user as any).profilePicture = action.payload
    }
  },
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
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
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
      .addCase(
        resendVerificationEmail.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.message = action.payload.message;
        }
      )
      .addCase(
        resendVerificationEmail.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      )
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
      .addCase(
        googleAuthCallback.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.token = action.payload.data.token;
          state.message = action.payload.message;
        }
      )
      .addCase(
        googleAuthCallback.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      )
      .addCase(sendResetLink.pending, (state) => {
        state.isLoading = true;
        state.fail = false;
        state.isSuccess = false;
      })
      .addCase(sendResetLink.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(sendResetLink.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.fail = true;
        state.message = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.fail = false;
        state.isSuccess = false;
      })
      .addCase(resetPassword.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.fail = true;
        state.message = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.userId = action.payload.data.userId || "";
        if(state.message !== "Check your Email for OTP Confirmation"){
          state.isAuthenticated = true;
          state.token = action.payload.data.token;
        }
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.payload
      })
      .addCase(logout.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(logout.fulfilled, (state, action: PayloadAction<any>) => {
        state.isError = false;
        state.isLoading = false;
        state.isAuthenticated = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        localStorage.clear();
        toast.success(action.payload.message);

      })
      .addCase(RESET_STATE,()=> initialState)
      .addCase(logout.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.payload
      })
      .addCase(getUserDetails.pending, (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.isAuthenticated = false;
      })
      .addCase( getUserDetails.fulfilled, (state, action: PayloadAction<IUser>) => {
          state.isError = false;
          state.isSuccess = true;
          state.isAuthenticated = true;
          state.user = action.payload.data.user;
        }
      )
      .addCase(getUserDetails.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true;
        state.isSuccess = false;
        state.isAuthenticated = false;
        state.user = undefined;
        state.error = action.payload.message;
      })

      .addCase(verifyOTP.fulfilled, (state, action: PayloadAction<any>) => {
        state.isError = false;
        state.isLoading = false;
        state.isAuthenticated = true;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.token = action.payload.data.token;
      })
      
  },
});

export const { resetAuth, changingProfile } = userSlice.actions;

export default userSlice.reducer;