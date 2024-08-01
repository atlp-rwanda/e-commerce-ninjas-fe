/* eslint-disable */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import userService from "./userService";
import {  IPassword, IProfile, UserService } from "../../../utils/types/store";

const initialState: UserService = {
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
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const updatePassword = createAsyncThunk<IPassword, { oldPassword: string; newPassword: string, confirmNewPassword: string }>("user/updatePassword", async({ oldPassword, newPassword, confirmNewPassword }, thunkApi)=>{
  try{
      const response = await userService.changePassword(oldPassword, newPassword, confirmNewPassword)
  return response
  }catch(error){
      return thunkApi.rejectWithValue(error)
  }
})

export const userSubmitSellerRequest = createAsyncThunk<IProfile, any>("user/userSubmitRequest", async(data: any, { rejectWithValue })=>{
    try{
    const response = await userService.userRequest(data)
    return response
    }catch(error){
        return rejectWithValue(error)
    }
})

export const addUserAddress = createAsyncThunk<IProfile, any>("user/fetchUserAddress", async({id,data}, {rejectWithValue})=>{
    try{
        const response = await userService.userAddress(data)
        return response
    }catch(error){
        rejectWithValue(error)
    }
})

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
              .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.user = action.payload.data.user;
                state.message = action.payload.message || null
                state.isSuccess = true;
              })
              .addCase(updateUserProfile.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = action.payload;
                state.isSuccess = false
              })
              .addCase(updatePassword.pending, (state)=>{
                state.isLoading= true,
                state.isError = null,
                state.isSuccess = false
            })
            .addCase(updatePassword.fulfilled, (state, action: PayloadAction<any>)=>{
                state.isLoading = false,
                state.isError = null,
                state.user = action.payload,
                state.message= action.payload.message || "password updated successfully"
                state.isSuccess = true
            })
            .addCase(updatePassword.rejected, (state, action: PayloadAction<any>)=>{
                state.isLoading= false,
                state.isError= action.payload.error || null,
                state.isSuccess = false
            })
            .addCase(addUserAddress.pending, (state)=>{
                state.isLoading= true,
                state.isError = null,
                state.isSuccess = false
            })
            .addCase(addUserAddress.fulfilled, (state, action: PayloadAction<any>)=>{
                state.isLoading = false,
                state.isError = null,
                state.user = action.payload,
                state.isSuccess = true
                state.message = action.payload || "user addresss added successfully"
            })
            .addCase(addUserAddress.rejected, (state, action: PayloadAction<any>)=>{
                state.isLoading= false,
                state.isError= action.payload.error || null,
                state.isSuccess = false
                state.message = action.payload
            })
            .addCase(userSubmitSellerRequest.pending, (state)=>{
                state.isLoading= true,
                state.isError = null,
                state.isSuccess = false
            })
            .addCase(userSubmitSellerRequest.fulfilled, (state, action: PayloadAction<any>)=>{
                state.isLoading = false,
                state.isError = null,
                state.user = action.payload,
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(userSubmitSellerRequest.rejected, (state, action: PayloadAction<any>)=>{
                state.isLoading= false,
                state.isError= action.payload.error || null,
                state.isSuccess = false
                state.message = action.payload
            })
              ;
    }
})

export default userSlice.reducer;