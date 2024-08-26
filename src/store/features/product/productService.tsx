/* eslint-disable */
import { axiosInstance, getErrorMessage } from "../../../utils/axios/axiosInstance";

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

const searchProduct = async (criteria: any) => {
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
    const response = await axiosInstance.put(`/api/shop/seller-update-product/${id}`, newProductData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
}

const updateSellerProductStatus = async (id: string, newStatus: string) => {
  try {
    const response = await axiosInstance.put(`/api/shop/seller-update-product-status/${id}`, {status: newStatus});
    return response.data;
  }
  catch (error) {
    throw new Error(getErrorMessage(error))
  }
}

const addSellerProduct = async (newProductData: FormData) => {
    const response = await axiosInstance.post(`/api/shop/seller-create-product`, newProductData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
}
const sellerGetAllProducts = async () => {
  const response = await axiosInstance.get(`/api/shop/seller-get-products`);
  return response.data;
}
const sellerGetOrderHistory = async () => {
  const response = await axiosInstance.get(`/api/shop/seller-get-orderHistory`);
  return response.data;
}

const deleteProduct = async (productId) => {
  const response = await axiosInstance.delete(`/api/shop/seller-delete-product/${productId}`);
  return response.data;
}

const fetchAllShops = async () => {
  const response = await axiosInstance.get(`/api/shop/get-all-shops`);
  return response.data;
};

const fetchProductsByShopId = async (id: string) => {
  const response = await axiosInstance.get(`/api/shop/get-products-by-shop/${id}`);
  return response.data;
};

const productService = {
  fetchProducts,
  fetchSingleProduct,
  fetchProductReviews,
  fetchShopInfo,
  searchProduct,
  fetchSellerProducts,
  fetchSellerSingleProduct,
  updateSellerProduct,
  addSellerProduct,
  updateSellerProductStatus,
  sellerGetAllProducts,
 sellerGetOrderHistory,
 deleteProduct,
 fetchAllShops,
 fetchProductsByShopId,
}
export default productService;