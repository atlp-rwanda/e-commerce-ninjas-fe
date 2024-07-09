/* eslint-disable */
import axiosInstance from "../../../utils/axios/axiosInstance";

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

const productService = {
    fetchProducts,
    fetchSingleProduct
}
export default productService;