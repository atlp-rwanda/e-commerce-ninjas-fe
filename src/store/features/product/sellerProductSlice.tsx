/* eslint-disable */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import productService from "./productService";
import { ISingleProductInitialResponse, ISingleProductResponse } from "../../../utils/types/store";

const initialState: ISingleProductInitialResponse = {
    product: null,
    isLoading: false,
    isError: null,
    isSuccess: false,
    message: ''
}

export const fetchSingleSellerProduct = createAsyncThunk<ISingleProductResponse, string>("products/fetchSingleSellerProducts", async (id, { rejectWithValue }) => {
    try {
        const response = await productService.fetchSellerSingleProduct(id);
        return response;
    } catch (error) {
        return rejectWithValue('Failed to fetch product.');
    }
});


const singleSellerProductSlice = createSlice({
    name: "singleProduct",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSingleSellerProduct.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
                state.isSuccess = false;
            })
            .addCase(fetchSingleSellerProduct.fulfilled, (state, action: PayloadAction<ISingleProductResponse>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product = action.payload.data?.product[0] || null;
            })
            .addCase(fetchSingleSellerProduct.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = action.payload.error || null;
                state.isSuccess = false;
                state.message = action.payload.message || null
            });
    }
})

export default singleSellerProductSlice.reducer;
