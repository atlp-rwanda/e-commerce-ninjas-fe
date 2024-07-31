/* eslint-disable */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import cartService from "./cartService";
import { getErrorMessage } from "../../../utils/axios/axiosInstance";
import { toast } from "react-toastify";
import { iCartInitialResource } from "../../../utils/types/store";

const initialState: iCartInitialResource = {
  carts: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  isLoggedOut: false,
  cartCounter: 0,
  cartTotalMoney: 0,
  cartProductslist:[]
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

export const checkout = createAsyncThunk(
  "cart/buyer-cart-checkout",
  async (cartId: string, thunkApi) => {
    try {
      const response = await cartService.productCheckout(cartId);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
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

const calculateTotalPrice = (carts: any[]) => {
  let total = 0;
  carts.forEach((cart) => {
    if (cart.products) {
      cart.products.forEach((product: any) => {
        total += product.price * product.quantity;
      });
    }
  });
  return total;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      state.carts.push(action.payload);
      // state.cartCounter += 1;
      state.cartTotalMoney = calculateTotalPrice(state.carts);
    },
    usergetCarts: (state, action: PayloadAction<any>) => {
      state.carts.push(action.payload);
      state.cartTotalMoney = calculateTotalPrice(state.carts);
    },
    updateCartProductQuantity: (state, action: PayloadAction<{ productId: string, quantity: number }>) => {
      const { productId, quantity } = action.payload;
      state.carts.forEach(cart => {
        cart.products.forEach((product: any) => {
          if (product.id === productId) {
            product.quantity = quantity;
            product.price =  product.price*quantity;
          }
        });
      });
      state.cartTotalMoney = calculateTotalPrice(state.carts);
      console.log(state.cartTotalMoney);
      
    }
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
        // state.cartCounter += 1;
        state.cartTotalMoney = calculateTotalPrice(state.carts);
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
        state.carts = action.payload.data.carts;
        let cartProductsTotal = 0;
        let cartMoney  = 0;
        action.payload.data.carts.forEach((cart: any) => {
          if (cart.products) {
            cartProductsTotal += cart.products.length;
            cart.products.forEach((product: any) => {
             cartMoney += product.price * product.quantity;
            });
          }
        });
        state.cartCounter = cartProductsTotal;
        state.cartTotalMoney = cartMoney
        state.message = "";
      })
      .addCase(getUserCarts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(checkout.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.carts.push(action.payload);
        state.message = "";
      })
      .addCase(checkout.rejected, (state, action) => {
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
      .addCase(clearCarts.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.carts = [];
        state.cartCounter = 0;
        state.cartTotalMoney = 0;
        state.message = action.payload.message;
      })
      .addCase(clearCarts.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { addCart, usergetCarts, updateCartProductQuantity } = cartSlice.actions;
export default cartSlice.reducer;
