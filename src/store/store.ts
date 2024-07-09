/* eslint-disable */
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import welcomeReducer from "./features/welcomeSlice";
import productReducer from './features/product/productSlice';
import singleProductReducer from './features/product/singleProductSlice';

export const store = configureStore({
  reducer: {
    initialMessage: welcomeReducer,
    products: productReducer,
    singleProduct: singleProductReducer
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;