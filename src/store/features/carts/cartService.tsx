/* eslint-disable */
import { axiosInstance } from '../../../utils/axios/axiosInstance';

const createCart = async (productId: string, quantity: number) => {
  try {
    const response = await axiosInstance.post('/api/cart/create-update-cart', {
      productId,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating cart', error);
    throw error;
  }
};

const getUserCarts = async () => {
  try {
    const response = await axiosInstance.get('/api/cart/buyer-get-carts');
    return response.data;
  } catch (error) {
    console.error('Error getting user carts', error);
    throw error;
  }
};
const productCheckout = async (cartId: string) => {
  const response = await axiosInstance.get(
    `/api/cart/buyer-cart-checkout/${cartId}`
  );
  return response.data;
};
const clearCart = async (cartId: string) => {
try {
  const response = await axiosInstance.delete(`api/cart/buyer-clear-cart/${cartId}`);
  return response.data;
} catch (error) {
  throw error
}
}
const clearCartProduct = async (cartId: string, productId: string) => {
 try {
  const response = await axiosInstance.delete(`api/cart/buyer-clear-cart-product/${cartId}/${productId}`);
  return response.data;
 } catch (error) {
  throw error
 }
}
const clearCarts = async () => {
  try {
    const response = await axiosInstance.delete("/api/cart/buyer-clear-carts");
    return response
  }
  catch (error) {
    console.error("Error clear carts", error);
    throw error;
  }
}


const userPayCart = async (cartId: string) => {
  const response = await axiosInstance.post(`/api/cart/buyer-pay-cart`, {
    cartId,
  });
  return response.data;
};

const cartService = {
  createCart,
  getUserCarts,
  productCheckout,
  clearCarts,
  clearCart,
  clearCartProduct,
  userPayCart,
};
export default cartService;
