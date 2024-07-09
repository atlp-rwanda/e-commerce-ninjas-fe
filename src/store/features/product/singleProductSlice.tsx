/* eslint-disable */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import productService from "./productService";
import { IProduct } from "../../../utils/types/store";

const initialState: { product: IProduct | null; isLoading: boolean; isError: string | null; isSuccess: boolean; message: string } = {
    product: null,
    isLoading: false,
    isError: null,
    isSuccess: false,
    message: ''
}

export const fetchSingleProduct = createAsyncThunk<IProduct, string>("products/fetchSingleProducts", async (id, {rejectWithValue}) => {
    try {
        const response = await productService.fetchSingleProduct(id);
        return response.product;
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
           .addCase(fetchSingleProduct.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product = action.payload;
            })
           .addCase(fetchSingleProduct.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = action.payload;
                state.isSuccess = false;
            });
    }
})

export default singleProductSlice.reducer;
