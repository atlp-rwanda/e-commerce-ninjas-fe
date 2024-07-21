/* eslint-disable */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import cartService from "./cartService";
import { getErrorMessage } from "../notifications/axios/axiosInstance";
import { toast } from "react-toastify";
import { iCartInitialResource } from "../../../utils/types/store";

const initialState: iCartInitialResource = {
  carts: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  isLoggedOut: false,
};

interface CreateCartParams {
  productId: string;
  quantity: number;
}

export const createCart = createAsyncThunk(
  "cart/create-cart",
  async ({ productId, quantity }: CreateCartParams, thunkAPI) => {
    try {
      const cart = await cartService.createCart(productId, quantity);
      return cart;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const getUserCarts = createAsyncThunk(
  "cart/userGetCarts",
  async (_, thunkAPI) => {
    try {
      const carts = await cartService.getUserCarts();
      return carts;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);
export const clearCarts = createAsyncThunk(
  "cart/userClearCarts",
  async (_, thunkAPI) => {
    try {
      const response = await cartService.clearCarts();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      state.carts.push(action.payload);
    },
    usergetCarts: (state, action: PayloadAction) => {
      state.carts.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCart.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.carts.push(action.payload);
        state.message = "Cart created successfully";
      })
      .addCase(createCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(getUserCarts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(getUserCarts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.carts.push(action.payload);
        state.message = "";
      })
      .addCase(getUserCarts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(clearCarts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(clearCarts.fulfilled, (state, action:PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(clearCarts.rejected, (state, action:PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { addCart, usergetCarts
 } = cartSlice.actions;
export default cartSlice.reducer;