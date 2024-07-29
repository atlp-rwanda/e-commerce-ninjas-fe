/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addToWishlist, removeFromWishlist, fetchWishlist } from '../wishlist/wishlistService';
import { getErrorMessage } from '../../../utils/axios/axiosInstance';

interface WishlistState {
  items: any[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
}

const initialState: WishlistState = {
  items: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const addProductToWishlist = createAsyncThunk(
  'wishlist/addProductToWishlist',
  async (productId: string, thunkAPI) => {
    try {
      return await addToWishlist(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const removeProductFromWishlist = createAsyncThunk(
  'wishlist/removeProductFromWishlist',
  async (productId: string, thunkAPI) => {
    try {
      return await removeFromWishlist(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchWishlistProducts = createAsyncThunk(
  'wishlist/fetchWishlistProducts',
  async (_, thunkAPI) => {
    try {
      return await fetchWishlist();
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlistProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWishlistProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items = action.payload;
      })
      .addCase(fetchWishlistProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(addProductToWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProductToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items.push(action.payload);
        state.message = action.payload.message;
      })
      .addCase(addProductToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(removeProductFromWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeProductFromWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items = state.items.filter(item => item.id !== action.meta.arg);
        state.message = action.payload.message;
      })
      .addCase(removeProductFromWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export default wishlistSlice.reducer;
