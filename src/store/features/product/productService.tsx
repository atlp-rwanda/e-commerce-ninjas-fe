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

const searchProduct = async(criteria:any)=>{
  const response = await axiosInstance.get(`/api/shop/user-search-products?${criteria}`);
  return response.data;
}


const fetchSellerProducts = async () => {
  try {
    const response = await axiosInstance.get(`/api/shop/seller-get-products`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products.');
  }
};

const fetchSellerSingleProduct = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/shop/seller-get-product/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch product.');
  }
};

const updateSellerProduct = async (id: string, newProductData: FormData) => {
  try{
    const response = await axiosInstance.put(`/api/shop/seller-update-product/${id}`, newProductData)
    return response.data;
  }
  catch (error){
    throw new Error('Failed to update product')
  }
}

const productService = {
    fetchProducts,
    fetchSingleProduct,
    fetchProductReviews,
    fetchShopInfo,
    searchProduct,
    fetchSellerProducts,
    fetchSellerSingleProduct,
    updateSellerProduct
}
export default productService;