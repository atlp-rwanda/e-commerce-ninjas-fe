/* eslint-disable */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios/axiosInstance';
import { IProducts } from '../../utils/types/Product';

const initialState: IProducts = {
  nextPage: 0,
  currentPage: 0,
  previousPage: 0,
  limit: 0,
  data: [],
};

interface SearchCriteria {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const searchProduct = createAsyncThunk<IProducts, SearchCriteria>(
  'searchProduct',
  async (criteria) => {
    const response = await axiosInstance.get<IProducts>('/api/shop/user-search-products', {
      params: criteria,
    });
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchProduct.fulfilled, (state, action: PayloadAction<IProducts>) => {
        state.nextPage = action.payload.nextPage;
        state.currentPage = action.payload.currentPage;
        state.previousPage = action.payload.previousPage;
        state.limit = action.payload.limit;
        state.data = action.payload.data;
        state.error = undefined;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.currentPage = -1;
        state.error = action.error.message;
      });
  },
});

export const selectSearchResults = (state:any) => state.searchProduct.data;
export const selectSearchError = (state:any) => state.searchProduct.error;

export default productSlice.reducer;
