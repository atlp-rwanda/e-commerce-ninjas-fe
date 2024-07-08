/* eslint-disable */
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import welcomeReducer from "./features/welcomeSlice";
import searchReducer from './features/ProductSlice';
import productReducer from './features/product/productSlice'
export const store = configureStore({
  reducer: {
    initialMessage: welcomeReducer,
    searchProduct:searchReducer,
    products: productReducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;