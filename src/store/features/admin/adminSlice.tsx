/* eslint-disable */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import adminService from "./adminService";
import { getErrorMessage } from "../../../utils/axios/axiosInstance";
import { AdminReponse, IAdminInitialResponse } from "../../../utils/types/store";
import { toast } from "react-toastify";

const initialState: IAdminInitialResponse = {
    message: "",
    users: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    passwordExpiration:null
};

export const getAllUsers = createAsyncThunk('admin/getAllUsers', async (_, thunkApi) => {
    try {
        const response = await adminService.getAllUsers();
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(getErrorMessage(error));
    }
})

export const getUserById = createAsyncThunk('admin/getUserById', async (userId: string, thunkApi) => {
    try {
        const response = await adminService.getUserById(userId);
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(getErrorMessage(error));
    }
})

export const updateUserRole = createAsyncThunk('admin/updateUser', async ({ userId, role }: { userId: string, role: string }, thunkApi) => {
    try {
        const response = await adminService.updateUserRole(userId, role);
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(getErrorMessage(error));
    }
})

export const updateUserStatus = createAsyncThunk('admin/updateUserStatus',async({ userId, status }: { userId: string, status: string}, thunkApi) => {
    try {
        const response = await adminService.updateUserStatus(userId, status);
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(getErrorMessage(error));
    }
});
export const getOrderHistory = createAsyncThunk('admin/getOrderHistory', async (_, thunkApi) => {
    try {
        const response = await adminService.getOrderHistory();
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(getErrorMessage(error));
    }
});
export const getAllShops = createAsyncThunk('admin/admin-get-shops', async (_, thunkApi) => {
    try {
        const response = await adminService.getAllShops();
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(getErrorMessage(error));
    }
})

export const updateUserPasswordExpiration = createAsyncThunk(
    'admin/updateUserPasswordExpiration',
    async ({ minutes }: { minutes: number }, thunkApi) => {
        try {
            const response = await adminService.updatePasswordExpiration(minutes);
            return response;
        } catch (error) {
            return thunkApi.rejectWithValue(getErrorMessage(error));
        }
    }
);

export const fetchPasswordExpiration = createAsyncThunk('admin/fetchPasswordExpiration', async (_, thunkApi) => {
    try {
        const response = await adminService.getPasswordExpiration();
        return response.minutes;
    } catch (error) {
        return thunkApi.rejectWithValue(getErrorMessage(error));
    }
});

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getAllUsers.fulfilled, (state, action:PayloadAction<AdminReponse>) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.users = action.payload.data.user;
                state.message = action.payload.message;

            })
            .addCase(getAllUsers.rejected, (state, action:PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload  || action.payload.message;
            })
            .addCase(updateUserRole.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUserRole.fulfilled, (state, action:PayloadAction<AdminReponse>) => {
                const { id, role } = action.payload.data.user;
                const user = state.users.find((user) => user.id === id);
                if (user) {
                    user.role = role;
                }
                state.isSuccess = true;
                state.isLoading = false;
                state.message = action.payload.message;
                toast.success(state.message);
            })
            .addCase(updateUserRole.rejected, (state, action:PayloadAction<AdminReponse>) => {
                state.isLoading = false;
                state.message = action.payload.message;
                toast.error(state.message);
            })
            .addCase(updateUserStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUserStatus.fulfilled, (state, action:PayloadAction<AdminReponse>) => {
                const { id, status } = action.payload.data.user;
                const user = state.users.find((user) => user.id === id);
                if (user) {
                    user.status = status;
                }
                state.isSuccess = true;
                state.isLoading = false;
                state.message = action.payload.message;
                toast.success(state.message);
            })
            .addCase(updateUserStatus.rejected, (state, action:PayloadAction<AdminReponse>) => {
                state.isLoading = false;
                state.message = action.payload.message;
                toast.error(state.message);
            })
            .addCase(getOrderHistory.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getOrderHistory.fulfilled, (state, action:PayloadAction<AdminReponse>) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.users = action.payload.data.user;
                state.message = action.payload.message;

            })
            .addCase(getOrderHistory.rejected, (state, action:PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload  || action.payload.message;
            })
            .addCase(getAllShops.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getAllShops.fulfilled, (state, action:PayloadAction<AdminReponse>) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.users = action.payload.data.user;
                state.message = action.payload.message;

            })
            .addCase(getAllShops.rejected, (state, action:PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload  || action.payload.message;
            })
            .addCase(updateUserPasswordExpiration.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUserPasswordExpiration.fulfilled, (state, action: PayloadAction<AdminReponse>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = action.payload.message;
                toast.success(state.message);
            })
            .addCase(updateUserPasswordExpiration.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || action.payload.message;
                toast.error(state.message);
            })
            .addCase(fetchPasswordExpiration.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchPasswordExpiration.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.passwordExpiration = action.payload;
            })
           
            .addCase(fetchPasswordExpiration.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(state.message);
            })
},
});

export default adminSlice.reducer;