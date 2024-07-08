/* eslint-disable */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import productService from "./productService";
import { IProduct } from "../../../utils/types/store";

const initialState: { products: IProduct[] | null; isLoading: boolean; isError: string | null; isSuccess: boolean; message: string } = {
    products: null,
    isLoading: false,
    isError: null,
    isSuccess: false,
    message: ''
}

export const fetchProducts = createAsyncThunk<IProduct[]>("products/fetchProducts", async () => {
    try {
        const response = await productService.fetchProducts();
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch products.');
    }
});


const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
           .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
                state.isSuccess = false;
            })
           .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products = action.payload;
            })
           .addCase(fetchProducts.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = action.payload;
                state.isSuccess = false;
            });
    }
})

export default productSlice.reducer;
