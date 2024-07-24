/* eslint-disable */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import productService from "./productService";
import { ISellerCollectionProductInitialResponse, ISellerCollectionProductResponse } from "../../../utils/types/store";

const initialState: ISellerCollectionProductInitialResponse = {
    data: {
        products: null,
        previousPage: 0,
        currentPage: 0,
        nextPage: 0,
        limit: 0
    },
    isLoading: false,
    isError: null,
    isSuccess: false,
    message: ''
}

export const fetchSellerCollectionProduct = createAsyncThunk<ISellerCollectionProductResponse>("products/fetchSellerCollectionProducts", async () => {
    try {
        const response = await productService.fetchSellerProducts();
        return response;
    } catch (error) {
        throw new error;
    }
});


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
                state.isError = action.payload.error || null;
                state.isSuccess = false;
                state.message = action.payload.message || null
            });
    }
})

export default sellerCollectionProductsSlice.reducer;
