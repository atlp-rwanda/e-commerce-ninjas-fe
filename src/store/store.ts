/* eslint-disable */

import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import welcomeReducer from "./features/welcomeSlice";
import productReducer from "./features/ProductSlice";

export const store = configureStore({
  reducer: {
    initialMessage: welcomeReducer,
    searchProduct:productReducer
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
