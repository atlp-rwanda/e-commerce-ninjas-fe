import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  name: string;
}

interface CartState {
  products: Product[];
}

const initialState: CartState = {
  products: [],
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<{ name: string }>) => {
      state.products.push({
        id: state.products.length,
        name: action.payload.name,
      });
    },
  },
});

export default CartSlice.reducer;
export const { addProduct } = CartSlice.actions;
