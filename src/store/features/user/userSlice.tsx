/* eslint-disable */
import { createSlice, createAsyncThunk, PayloadAction, isRejectedWithValue } from "@reduxjs/toolkit";
import userService from "./userService";
import {  IPassword, IProfile } from "../../../utils/types/store";

const initialState: { user: IProfile | null; isLoading: boolean; isError: string | null; isSuccess: boolean; message: string } = {
    user: null,
    isLoading: false,
    isError: null,
    isSuccess: false,
    message: ''
}

export const fetchUserProfile = createAsyncThunk<IProfile[]>("user/fetchUserProfile", async () => {
    try {
        const response = await userService.fetchUserProfile();
        return response;
    } catch (error) {
        throw new Error('Failed to fetch products.');
    }
});

export const updateUserProfile = createAsyncThunk<IProfile, FormData>(
    "user/updateUserProfile",
    async (formData: FormData, { rejectWithValue })=>{
    try {
        const response = await userService.updateUserProfile(formData);
        return response;
    } catch (error:any) {
        return rejectWithValue(error.response.data);
    }
})

export const updatePassword = createAsyncThunk<IPassword, IPassword>("userupdatePassword",
    async({password}, { rejectWithValue })=>{
        try{
            const response = await userService.fetchAndUpdatePassword(password)
            return response
        }catch(error: any){
            return rejectWithValue(error.response.data)
        }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
           .addCase(fetchUserProfile.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
                state.isSuccess = false;
            })
           .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
           .addCase(fetchUserProfile.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = action.payload;
                state.isSuccess = false;
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
                state.isSuccess = false;
              })
              .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
              })
              .addCase(updateUserProfile.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = action.payload;
                state.isSuccess = false
              })
              .addCase(updatePassword.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
                state.isSuccess = false;
              })
              .addCase(updatePassword.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
              })
              .addCase(updatePassword.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = action.payload;
                state.isSuccess = false
              })
              ;
    }
})

export default userSlice.reducer;