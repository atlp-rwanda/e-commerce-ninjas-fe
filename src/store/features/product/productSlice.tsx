/* eslint-disable */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import productService from "./productService";
import { IProduct, ISingleProduct, SearchCriteria } from "../../../utils/types/product";
import { getErrorMessage } from "../../../utils/axios/axiosInstance";

const initialState: { products: IProduct[] | null; isLoading: boolean; isError: boolean | null; isSuccess: boolean; message: string } = {
    products: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

export const fetchProducts = createAsyncThunk<IProduct[]>("products/fetchProducts", async (_,thunkApi) => {
    try {
        const response = await productService.fetchProducts();
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(getErrorMessage(error));
    }
});

export const searchProduct = createAsyncThunk<IProduct, SearchCriteria>("product/searchProduct", async (criteria,thunkApi) => {
    try {
      const response = await productService.searchProduct(criteria);
        return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
           .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
           .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products = action.payload.products;
            })
           .addCase(fetchProducts.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.isSuccess = false;
            })
            .addCase(searchProduct.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            })
           .addCase(searchProduct.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products = action.payload.products;
                
            })
           .addCase(searchProduct.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.isSuccess = false;
            })
            ;
    }
})

export default productSlice.reducer;