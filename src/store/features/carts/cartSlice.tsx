/* eslint-disable */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import cartService from './cartService';
import { getErrorMessage } from '../../../utils/axios/axiosInstance';
import { iCartInitialResource } from '../../../utils/types/store';

const initialState: iCartInitialResource = {
  carts: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  isLoggedOut: false,
  cartCounter: 0,
  cartTotalMoney: 0,
  cartProductslist: [],
  orders: null,
};

interface CreateCartParams {
  productId: string;
  quantity: number;
}

export const createCart = createAsyncThunk(
  'cart/create-cart',
  async ({ productId, quantity }: CreateCartParams, thunkAPI) => {
    try {
      const cart = await cartService.createCart(productId, quantity);
      return cart;
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

export const getUserCarts = createAsyncThunk(
  'cart/userGetCarts',
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
  'cart/buyer-cart-checkout',
  async (cartId: string, thunkApi) => {
    try {
      const response = await cartService.productCheckout(cartId);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/buyer-clear-cart',
  async (cartId: string, thunkApi) => {
    try {
      const response = await cartService.clearCart(cartId);
      await cartService.getUserCarts();

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const clearCartProduct = createAsyncThunk(
  'cart/buyer-clear-cart-product',
  async (
    { cartId, productId }: { cartId: string; productId: string },
    thunkApi
  ) => {
    try {
      const response = await cartService.clearCartProduct(cartId, productId);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const clearCarts = createAsyncThunk(
  'cart/userClearCarts',
  async (_, thunkAPI) => {
    try {
      const response = await cartService.clearCarts();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const createProductStripe = createAsyncThunk(
  'cart/createCartProduct',
  async (data: any, thunkApi) => {
    try {
      const response = await cartService.createStripeProduct(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const createSessionStripe = createAsyncThunk(
  'cart/createSessionStripe',
  async (data: any, thunkApi) => {
    try {
      const response = await cartService.createStripeSession(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);
export const updateCartStatus = createAsyncThunk(
  'cart/updateCartStatus',
  async (data: any, thunkApi) => {
    try {
      const response = await await cartService.updateCartStatus(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const userSaveOrder = createAsyncThunk(
  'cart/saveOrder',
  async (data: any, thunkApi) => {
    try {
      const response = await cartService.saveOrder(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const getUserOrders = createAsyncThunk(
  'cart/GetOrders',
  async (_, thunkApi) => {
    try {
      const response = await cartService.getUserOrders();
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const userTrackOrderStatus = createAsyncThunk(
  'cart/userTrackOrderStatus',
  async (id: any, thunkApi) => {
    try {
      const response = await cartService.userTrackOrderStatus(id);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, action) => {
      state.carts.push(action.payload);
    },
    usergetCarts: (state, action: PayloadAction) => {
      state.carts.push(action.payload);
    },
    updateCartProductQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      state.carts.forEach((cart) => {
        cart.products.forEach((product: any) => {
          if (product.id === productId) {
            product.quantity = quantity;
            product.price = product.price * quantity;
          }
        });
      });
      state.cartTotalMoney = calculateTotalPrice(state.carts);
    },
    userGetOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCart.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = '';
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.carts.push(action.payload);
        state.message = 'Cart created successfully';
      })
      .addCase(createCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = '';
      })
      .addCase(getUserCarts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = '';
      })
      .addCase(getUserCarts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.carts = action.payload.data.carts;
        let cartProductsTotal = 0;
        let cartTotalAmount = 0;
        let cartsProductsList = [];
        action.payload.data.carts.forEach((cart) => {
          cartProductsTotal += cart.products.length;
          cartTotalAmount += cart.total;
        });
        state.cartCounter = cartProductsTotal;
        state.cartTotalMoney = cartTotalAmount;

        action.payload.data.carts.forEach((cart) => {
          cart.products.forEach((product) => {
            cartsProductsList.push(product.id);
          });
        });
        state.cartProductslist = cartsProductsList;

        state.message = '';
      })
      .addCase(getUserCarts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = '';
      })
      .addCase(checkout.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = '';
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.carts.push(action.payload);
        state.message = '';
      })
      .addCase(checkout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = '';
      })
      .addCase(clearCart.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = '';
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;

        state.message = action.payload.message;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = '';
      })
      .addCase(clearCartProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = '';
      })
      .addCase(clearCartProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.carts.push(action.payload);
        state.message = '';
      })
      .addCase(clearCartProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = '';
      })
      .addCase(clearCarts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = '';
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
      })
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orders = action.payload;
        state.message = 'Orders retrieved successfully';
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = '';
      })
      .addCase(userTrackOrderStatus.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(userTrackOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = 'Order status updated successfully';
      })
      .addCase(userTrackOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = '';
      });
  },
});

export const { addCart, usergetCarts, updateCartProductQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
