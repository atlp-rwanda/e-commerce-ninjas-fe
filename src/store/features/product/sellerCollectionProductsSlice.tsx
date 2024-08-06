/* eslint-disable */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import productService from "./productService";
import { ISellerCollectionProductInitialResponse, ISellerCollectionProductResponse } from "../../../utils/types/store";
import { getErrorMessage } from "../../../utils/axios/axiosInstance";

const initialState: ISellerCollectionProductInitialResponse = {
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
    message: ''
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

export const deleteItem = createAsyncThunk<ISellerCollectionProductInitialResponse, string>("product/deleteProduct", async (id, thunkApi) => {
    try {
        const response = await productService.SellerDeleteItem(id)
        return response
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

const sellerCollectionProductsSlice = createSlice({
    name: "sellerCollectionProducts",
    initialState,
    reducers: {
        removeItem: (state, action: any) => {
            const itemId = action.payload
            state.data.products = state.data?.products.filter((item) =>item.id !== itemId)
        }
    },
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
            .addCase(sellerGetOrderHistory.fulfilled, (state, action: PayloadAction<ISellerCollectionProductResponse>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.data = action.payload.data;
            })
            .addCase(sellerGetOrderHistory.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = false;
                state.message = action.payload.message || null
            })
            .addCase(deleteItem.pending, (state) => {
                state.isError = false,
                    state.isSuccess = false
            })
            .addCase(deleteItem.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(deleteItem.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false,
                    state.isError = true,
                    state.message = action.payload,
                    state.isSuccess = false
            });;
    }
})
export const {removeItem} = sellerCollectionProductsSlice.actions
export default sellerCollectionProductsSlice.reducer;