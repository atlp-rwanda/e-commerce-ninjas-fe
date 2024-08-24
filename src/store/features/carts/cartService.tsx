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
    const response = await axiosInstance.delete(
      `api/cart/buyer-clear-cart/${cartId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
const clearCartProduct = async (cartId: string, productId: string) => {
  try {
    const response = await axiosInstance.delete(
      `api/cart/buyer-clear-cart-product/${cartId}/${productId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
const clearCarts = async () => {
  try {
    const response = await axiosInstance.delete('/api/cart/buyer-clear-carts');
    return response;
  } catch (error) {
    console.error('Error clear carts', error);
    throw error;
  }
};

const createStripeProduct = async (data) => {
  const response = await axiosInstance.post('/api/cart/create-stripe-product', {
    planInfo: {
      active: true,
      name: data.name,
      'images[0]': data.image1,
      'images[1]': data.image2,
      url: 'https://e-commerce-ninja-fn-staging.netlify.app',
      description: data.description,
      default_price_data: {
        unit_amount: data.unit_amount,
        currency: 'rwf',
      },
    },
  })
  return response.data;
};

const createStripeSession = async (data) => {
  const response = await axiosInstance.post(
    '/api/cart/checkout-stripe-session',
    {
      sessionInfo: {
        success_url: data.successUrl,
        cancel_url: data.cancelUrl,
        customer_email: data.customerEmail,
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

const updateCartStatus = async (data) => {
  const response = await axiosInstance.put('/api/cart/update-cart-status', {
    cartId: data.cartId,
    status: data.status,
  });
  return response.data;
};

const saveOrder = async (data) => {
  const response = await axiosInstance.post('/api/cart/user-create-order', {
    cartId: data.cartId,
    paymentMethodId: data.paymentMethodId,
    products: data.products,
    status: 'pending',
    shopId: data.shopId,
  });
  return response.data;
};

const getUserOrders = async () => {
  const response = await axiosInstance.get(
    '/api/cart/buyer-get-orders-history'
  );
  return response.data;
};
const userTrackOrderStatus = async (id) => {
  const reponse = await await axiosInstance.get(
    `/api/cart/user-get-order-status/${id}`
  );
  return reponse.data;
};

const cartService = {
  createCart,
  getUserCarts,
  productCheckout,
  clearCarts,
  clearCart,
  clearCartProduct,
  createStripeProduct,
  createStripeSession,
  updateCartStatus,
  saveOrder,
  getUserOrders,
  userTrackOrderStatus
};
export default cartService;
