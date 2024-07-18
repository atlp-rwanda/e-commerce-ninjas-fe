/* eslint-disable */
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import welcomeReducer from "./features/welcomeSlice";
import productReducer from './features/product/productSlice';
import authReducer from './features/auth/authSlice';
import singleProductReducer from './features/product/singleProductSlice';
import singleSellerProductReducer from './features/product/sellerProductSlice';
import sellerCollectionProducts from './features/product/sellerCollectionProductsSlice';
import notificationReducer from './features/notifications/notificationSlice';

export const store = configureStore({
  reducer: {
    initialMessage: welcomeReducer,
    auth: authReducer,
    products: productReducer,
    singleProduct: singleProductReducer,
    singleSellerProduct: singleSellerProductReducer,
    sellerCollectionProducts: sellerCollectionProducts,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;