/* eslint-disable */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import productService from "./productService";
import { IProductInitialResponse, IProductResponse } from "../../../utils/types/store";

const initialState: IProductInitialResponse = {
    product: null,
    isLoading: false,
    isError: null,
    isSuccess: false,
    message: ''
}

export const fetchSingleProduct = createAsyncThunk<IProductResponse, string>("products/fetchSingleProducts", async (id, { rejectWithValue }) => {
    try {
        const response = await productService.fetchSingleProduct(id);
        return response;
    } catch (error) {
        return rejectWithValue('Failed to fetch product.');
    }
});


const singleProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSingleProduct.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
                state.isSuccess = false;
            })
            .addCase(fetchSingleProduct.fulfilled, (state, action: PayloadAction<IProductResponse>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product = action.payload.data?.product || null;
            })
            .addCase(fetchSingleProduct.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = action.payload.error || null;
                state.isSuccess = false;
                state.message = action.payload.message || null
            });
    }
})

export default singleProductSlice.reducer;