/* eslint-disable */
import { axiosInstance } from "../../../utils/axios/axiosInstance";

const createCart = async (productId: string, quantity: number) => {
  try {
    const response = await axiosInstance.post("/api/cart/create-update-cart", {
      productId,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating cart", error);
    throw error;
  }
};

const getUserCarts = async ()=> {
    try {
        const response = await axiosInstance.get("/api/cart/buyer-get-carts");
        return response.data
    }
    catch (error) {
        console.error("Error getting user carts", error);
        throw error;
    }
}

const productCheckout = async (cartId: string) => {
  const response = await axiosInstance.get(
    `/api/cart/buyer-cart-checkout/${cartId}`
  );
  return response.data;
};

const cartService = {
  createCart,
  getUserCarts,
  productCheckout
};

export default cartService;
