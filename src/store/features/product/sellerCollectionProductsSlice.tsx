/* eslint-disable */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import productService from "./productService";
import { ISellerCollectionProductInitialResponse, ISellerCollectionProductResponse } from "../../../utils/types/store";
import { getErrorMessage } from "../../../utils/axios/axiosInstance";

const initialState: ISellerCollectionProductInitialResponse = {
    message: "",
    data: {
        products: null,
        previousPage: 0,
        currentPage: 0,
        nextPage: 0,
        limit: 0
    },
    isLoading: false,
    isError: false,
    isSuccess: false,
    OrderHistory: null
}

export const fetchSellerCollectionProduct = createAsyncThunk<ISellerCollectionProductResponse>("products/fetchSellerCollectionProducts", async (_,thunkApi) => {
    try {
        const response = await productService.fetchSellerProducts();
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(getErrorMessage(error));
    }
});
export const sellerGetAllProducts = createAsyncThunk('seller/seller-get-products', async (_, thunkApi) => {
    try {
        const response = await productService.sellerGetAllProducts();
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(getErrorMessage(error));
    }
})
export const sellerGetOrderHistory = createAsyncThunk('seller/seller-get-orderHisory', async (_, thunkApi) => {
    try {
        const response = await productService.sellerGetOrderHistory();
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(getErrorMessage(error));
    }
})

const sellerCollectionProductsSlice = createSlice({
    name: "sellerCollectionProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSellerCollectionProduct.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
                state.isSuccess = false;
            })
            .addCase(fetchSellerCollectionProduct.fulfilled, (state, action: PayloadAction<ISellerCollectionProductResponse>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.data = action.payload.data;
            })
            .addCase(fetchSellerCollectionProduct.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = false;
                state.message = action.payload.message || null
            })
            .addCase(sellerGetAllProducts.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
                state.isSuccess = false;
            })
            .addCase(sellerGetAllProducts.fulfilled, (state, action: PayloadAction<ISellerCollectionProductResponse>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.data = action.payload.data;
            })
            .addCase(sellerGetAllProducts.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = false;
                state.message = action.payload.message || null
            })
            .addCase(sellerGetOrderHistory.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
                state.isSuccess = false;
            })
            .addCase(sellerGetOrderHistory.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.OrderHistory = action.payload.data;
            })
            .addCase(sellerGetOrderHistory.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            });
    }
})

export default sellerCollectionProductsSlice.reducer;