/* eslint-disable */
import { axiosInstance } from '../../../utils/axios/axiosInstance';

export const addToWishlist = async (productId: string) => {
  const response = await axiosInstance.post(`/api/shop/buyer-add-product-wishList/${productId}`);
  return response.data;
};

export const removeFromWishlist = async (productId: string) => {
  const response = await axiosInstance.delete(`/api/shop/delete-wishlist-product/${productId}`);
  return response.data;
};

export const fetchWishlist = async () => {
  const response = await axiosInstance.get('/api/shop/buyer-view-wishlist-products');
  return response.data.data.WishList.wishListProducts.map((item: any) => item.products);
};
