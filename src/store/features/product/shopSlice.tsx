/* eslint-disable */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import productService from "./productService";
import { IShop, IProduct } from "../../../utils/types/product";
import { getErrorMessage } from "../../../utils/axios/axiosInstance";

const initialState: {
  shops: IShop[] | null;
  shopProductsByShop: { [key: string]: IProduct[] } | null;
  isLoadingShops: boolean;
  isErrorShops: boolean;
  isSuccessShops: boolean;
  isLoadingProducts: boolean;
  isErrorProducts: boolean;
  isSuccessProducts: boolean;
  message: string;
} = {
  shops: [],
  shopProductsByShop: null,
  isLoadingShops: false,
  isErrorShops: false,
  isSuccessShops: false,
  isLoadingProducts: false,
  isErrorProducts: false,
  isSuccessProducts: false,
  message: '',
};

export const fetchAllShops = createAsyncThunk<IShop[]>("shop/fetchAllShops", async (_, thunkApi) => {
  try {
    const response = await productService.fetchAllShops();
    return response.data.shops;
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const fetchProductsByShopId = createAsyncThunk<IProduct[], string>("shop/fetchProductsByShopId", async (id, thunkApi) => {
  try {
    const response = await productService.fetchProductsByShopId(id);
    return response.data.products;
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All Shops
      .addCase(fetchAllShops.pending, (state) => {
        state.isLoadingShops = true;
        state.isErrorShops = false;
        state.isSuccessShops = false;
        state.message = ''; // Clear previous messages
      })
      .addCase(fetchAllShops.fulfilled, (state, action: PayloadAction<IShop[]>) => {
        state.isLoadingShops = false;
        state.isSuccessShops = true;
        state.isErrorShops = false;
        state.shops = action.payload;
      })
      .addCase(fetchAllShops.rejected, (state, action: PayloadAction<any>) => {
        state.isLoadingShops = false;
        state.isErrorShops = true;
        state.isSuccessShops = false;
        state.message = action.payload;
      })
      
      // Fetch Products by Shop ID
      .addCase(fetchProductsByShopId.pending, (state) => {
        state.isLoadingProducts = true;
        state.isErrorProducts = false;
        state.isSuccessProducts = false;
        state.message = ''; // Clear previous messages
      })
      .addCase(fetchProductsByShopId.fulfilled, (state, action) => {
        state.isLoadingProducts = false;
        state.isSuccessProducts = true;
        state.isErrorProducts = false;
        const shopId = action.meta.arg;
        if (!state.shopProductsByShop) {
          state.shopProductsByShop = {};
        }
        state.shopProductsByShop[shopId] = action.payload;
      })
      .addCase(fetchProductsByShopId.rejected, (state, action: PayloadAction<any>) => {
        state.isLoadingProducts = false;
        state.isErrorProducts = true;
        state.isSuccessProducts = false;
        state.message = action.payload;
      });
  },
});

export default shopSlice.reducer;
