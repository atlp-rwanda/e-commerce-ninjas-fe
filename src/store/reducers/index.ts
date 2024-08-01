/* eslint-disable*/
import { combineReducers } from '@reduxjs/toolkit';
import welcomeReducer from '../features/welcomeSlice';
import productReducer from '../features/product/productSlice';
import authReducer from '../features/auth/authSlice';
import singleProductReducer from '../features/product/singleProductSlice';
import notificationReducer from '../features/notifications/notificationSlice';
import wishlistSlice from '../features/wishlist/wishlistSlice';
import singleSellerProductReducer from '../features/product/sellerProductSlice';
import sellerCollectionProducts from '../features/product/sellerCollectionProductsSlice';
import adminReducer from '../features/admin/adminSlice';
import cartReducer from "../features/carts/cartSlice";
import userReducer from "../features/user/userSlice"
import { RESET_STATE } from '../actions/resetAction';

const appReducer = combineReducers({
  initialMessage: welcomeReducer,
  auth: authReducer,
  products: productReducer,
  singleProduct: singleProductReducer,
  notification: notificationReducer,
  wishlist: wishlistSlice,
  singleSellerProduct: singleSellerProductReducer,
  sellerCollectionProducts: sellerCollectionProducts,
  admin: adminReducer,
  cart: cartReducer,
  user: userReducer
});

const rootReducer = (state, action) => {
  if (action.type === RESET_STATE) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;