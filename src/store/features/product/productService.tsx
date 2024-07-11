/* eslint-disable */
import {axiosInstance} from "../../../utils/axios/axiosInstance";

const fetchProducts = async () => {
  try {
    const response = await axiosInstance.get(`/api/shop/user-get-products`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products.');
  }
};

const fetchSingleProduct = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/shop/user-get-product/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products.');
  }
};

const fetchProductReviews = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/shop/user-get-product-reviews/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch reviews.');
  }
};

const fetchShopInfo = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/shop/user-get-shop-info/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch shops.');
  }
};

const productService = {
    fetchProducts,
    fetchSingleProduct,
    fetchProductReviews,
    fetchShopInfo
}
export default productService;