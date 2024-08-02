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

const createStripeProduct = async (data) => {
  console.log("Unnn",data)
  const response = await axiosInstance.post('/api/cart/create-stripe-product', {
    planInfo: {
      name: data.name,
      active: true,
      url: 'https://www.url-publicly-accessible-webpage-for-this-service.com',
      description: data.description,
      'images[0]': data.image1,
      'images[1]': data.image2,
      default_price_data: {
        unit_amount: data.unit_amount,
        currency: 'usd',
      },
    },
  });

  return response.data;
};

const saveCartOrder = async () => {
  const response = await axiosInstance.post(`/api/cart/webhook`);
  return response.data;
};

const createStripeSession = async (data) => {
  console.log("Data sesion",data)
  const response = await axiosInstance.post(
    '/api/cart/checkout-stripe-session',
    {
      sessionInfo: {
        success_url: data.successUrl,
        cancel_url: data.cancelUrl,
        customer_email: data.email,
        mode: 'payment',
        ui_mode: 'hosted',
        payment_method_types: ['card'],
        line_items: [
          {
            quantity: 1,
            price: data.price,
          },
        ],
      },
    }
  );
  return response.data;
};

const cartService = {
  createCart,
  getUserCarts,
  productCheckout,
  clearCarts,
  clearCart,
  clearCartProduct,
  saveCartOrder,
  createStripeProduct,
  createStripeSession,
};
export default cartService;
