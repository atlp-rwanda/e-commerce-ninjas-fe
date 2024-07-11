/* eslint-disable */
import {axiosInstance,getErrorMessage} from "../../../utils/axios/axiosInstance";

const fetchProducts = async () => {
    const response = await axiosInstance.get(`/api/shop/user-get-products`);
    return response.data;
};
const searchProduct = async(criteria:any)=>{
    const response = await axiosInstance.get(`/api/shop/user-search-products?${criteria}`);
    return response.data;
}

const productService = {
    fetchProducts,
    searchProduct
}
export default productService;