/* eslint-disable */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authService from "./authService";
import {IUser,IUserData } from "../../../utils/types/store";
import {getErrorMessage} from '../../../utils/axios/axiosInstance'
const initialState:AuthService= {
    user: undefined,
    isError: false,
    isLoading: false,
    isSuccess: false,
    isVerified: false,
    message: ""
};

export interface AuthService{
    user: IUserData | undefined,
    isError: boolean,
    isLoading: boolean,
    isSuccess: boolean,
    isVerified: boolean
    message: string
}


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
        console.log(response)
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
                state.isVerified = true;
                state.message = action.payload.message;
            })
            .addCase(verifyEmail.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                console.log(action.payload);
            })
    },
});

export default userSlice.reducer;
