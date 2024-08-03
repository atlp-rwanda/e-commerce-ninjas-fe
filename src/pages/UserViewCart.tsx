/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Meta } from '../components/Meta';
import { useAppDispatch, useAppSelector } from '../store/store';
import { PuffLoader, PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import {
  checkout,
  getUserCarts,
  clearCarts,
  createCart,
  clearCart,
  clearCartProduct,
  createProductStripe,
  createSessionStripe,
  updateCartStatus,
} from '../store/features/carts/cartSlice';
import {
  FaCheckSquare,
  FaMinus,
  FaPlus,
  FaEdit,
  FaTrash,
  FaGift,
  FaShippingFast,
} from 'react-icons/fa';
import { GiBroom } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Product from '../components/product/Product';
import { Box, LinearProgress } from '@mui/material';
import Button from '@mui/material/Button';
import Dispatch from 'react';
import { fetchUserProfile } from '../store/features/user/userSlice';
import { useLocation } from 'react-router-dom';

const UserViewCart: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [cartData, setCartData] = useState<any>(null);
  const [cartResponseData, setCartResponseData] = useState(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);
  const [isCheckoutSuccess, setCheckoutSuccess] = useState(null);
  const [isPreloader, setIsPreloader] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [totalProductPrice, setTotalProductPrice] = useState(0);
  const [arrayOfProduct, setArrayOfProduct] = useState(null);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [open, setOpen] = useState(false);
  const [cartToPay, setCartToPay] = useState<string | null>(null);
  const [amountToPay, setAmountToPay] = useState<any>(null);
  const [stripePrice, setStripePrice] = useState<string>('');
  const [currentEndpoint, setCurrentEndpoint] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const cartState = useAppSelector((state) => state.cart);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        setIsLoading(true);
        const response = await dispatch(getUserCarts());
        const response1 = await dispatch(getUserCarts()).unwrap();
        if (response.payload === 'Not authorized') {
          setIsLoggedOut(true);
          toast.error('Please login first');
          navigate('/login');
        }
        setCartResponseData(response1.data);
        setIsLoading(false);
      } catch (error: any) {
        if (error === 'Not authorized') {
          setIsLoggedOut(true);
          toast.error('Please login first');
          navigate('/login');
        }
        console.error('Error fetching carts:', error);
        setIsLoading(false);
        setIsError(true);
        toast.error(error.message);
      }
    };
    fetchCarts();
  }, [dispatch]);

  const handleCartCheckOut = async (
    cartId: string,
    index: number,
    productsArr: Array<{
      name: string;
      description: string;
      image: string;
      price: string;
    }>
  ) => {
    setIsPreloader(true);
    try {
      const response = await dispatch(checkout(cartId));
      if (!response.payload) {
        throw new Error('Checkout failed');
      }
      localStorage.setItem('cartToPay', cartId);

      const totalCartAmount = response.payload.data.totalAmount;
      const array = cartResponseData.carts[index];

      setArrayOfProduct(array);
      setCheckoutData(totalCartAmount);

      const totalProductPrice = array.products.reduce(
        (acc, product) => acc + parseFloat(product.price),
        0
      );
      setTotalProductPrice(totalProductPrice);

      const names = productsArr.map((product) => product.name).join(', ');
      // const descriptions = productsArr
      //   .map((product) => product.description)
      //   .join(', ');
      const descriptions = ' ';
      const image1 = productsArr[0]?.image;
      const image2 = productsArr[1]?.image;
      console.log('Products', productsArr);
      console.log('descriptions' + descriptions);
      console.log('Names' + names);

      const unit_amount = Math.round(totalCartAmount * 100);

      setAmountToPay(unit_amount);
      const stripeProduct = await dispatch(
        createProductStripe({
          name: names,
          description: descriptions,
          image1,
          image2,
          unit_amount: unit_amount,
        })
      );
      console.log('Created product', stripeProduct);

      console.log(
        'Stripe price before setting',
        stripeProduct.payload.data.product.default_price
      );
      localStorage.setItem(
        'stripePrice',
        stripeProduct.payload.data.product.default_price
      );
      console.log(
        'Stripe price after setting',
        localStorage.getItem('stripePrice')
      );
      console.log("Sesss cart",cartId);


      setCheckoutSuccess(true);

      toast.success('Checkout is done Successfully');
    } catch (error) {
      console.error('Checkout failed', error);
      toast.error('Checkout failed');
    } finally {
      setIsPreloader(false);
    }
  };

  const handlePayCart = async () => {
    try {
      setIsPreloader(true);
      const profile: any = await dispatch(fetchUserProfile());
      const data = {
        successUrl: 'http://localhost:5000/shopping-cart?success',
        cancelUrl: 'http://localhost:5000/shopping-cart?cancel',
        customerEmail: profile.payload.email,
        price: localStorage.getItem('stripePrice'),
      };
      console.log('Email', profile.payload.email);
      console.log('price: ' + localStorage.getItem('stripePrice'));
      const response = await dispatch(createSessionStripe(data));
      console.log('WQ', response);
      const url = response.payload.data.session.url;
      console.log(url);
      // window.location.href = url;
    } catch (error) {
      console.error('Checkout failed', error);
      toast.error('Checkout failed');
    } finally {
      setIsPreloader(false);
    }
  };
  useEffect(() => {
    checkPayFailOrSuccess();
  });
  const checkPayFailOrSuccess = async () => {
    const success = location.search;
    console.log('Success', success);
    const cancel = new URLSearchParams(window.location.search).get('cancel');
    if (success) {
      setIsPreloader(true);
      const cartId = localStorage.getItem('cartToPay');
      const data = {
        cartId: cartId,
        status: 'Paid',
      };
      console.log('Cartrtid', cartId);
      const cartStatus = await dispatch(updateCartStatus(data));
      console.log('UPdate cart', cartStatus);
      toast.success('Payment successful');
      // navigate('/shopping-cart');
      setIsPreloader(true);
    } else if (cancel) {
      toast.error('Payment cancelled');
    } else {
      console.log('No success or cancel query parameters found');
    }
  };

  useEffect(() => {
    checkPayFailOrSuccess();
  }, []);

  if (isLoading) {
    return (
      <div className="loader">
        <PuffLoader color="#ff6d18" size={300} loading={isLoading} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error-message">
        <p>Failed to load cart products. Please try again later.</p>
      </div>
    );
  }
  if (isLoggedOut) {
    return (
      <div className="error-message">
        <p>Please login or create account first.</p>
      </div>
    );
  }

  if (!cartResponseData || cartResponseData?.carts?.length < 1) {
    return (
      <div className="error-message">
        <p>Your cart is empty.</p>
      </div>
    );
  }

  const handleAddProductToCart = async (
    productId: string,
    quantity: number
  ) => {
    try {
      if (quantity < 1) return;
      const response = await dispatch(
        createCart({ productId, quantity })
      ).unwrap();

      if (response.data) {
        setQuantities((prevQuantities) => ({
          ...prevQuantities,
          [productId]: quantity,
        }));
        toast.success(response.message);
        const updatedResponse = await dispatch(getUserCarts()).unwrap();
        setCartResponseData(updatedResponse.data);
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      if (error === 'Not authorized') {
        localStorage.setItem('pendingCartProduct', productId);
        toast.error('Please login first');
        navigate('/login');
      } else {
        toast.error('Something went wrong. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const incrementQuantity = (productId: string) => {
    const currentQuantity = quantities[productId] || 1;
    handleAddProductToCart(productId, currentQuantity + 1);
  };

  const decrementQuantity = (productId: string) => {
    const currentQuantity = quantities[productId] || 1;
    if (currentQuantity > 1) {
      handleAddProductToCart(productId, currentQuantity - 1);
    }
  };
  const handleClearCart = async () => {
    try {
      await dispatch(clearCarts()).unwrap();
      const response1 = await dispatch(getUserCarts()).unwrap();
      setCartResponseData(response1.data);

      toast.success('Cart cleared successfully');
      setCartResponseData({ ...cartResponseData, carts: [] });
      setTotalProductPrice(0);
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear the cart');
    }
  };

  const handleClearSingleCart = async (cartId) => {
    try {
      await dispatch(clearCart(cartId));
      const response1 = await dispatch(getUserCarts()).unwrap();
      setCheckoutSuccess(false);
      setCartResponseData(response1.data);
      const remainingCarts = cartResponseData.carts.filter(
        (cart) => cart.cartId !== cartId
      );
      setCartResponseData({ ...cartResponseData, carts: remainingCarts });

      toast.success('Cart cleared successfully');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear the cart');
    }
  };

  const handleClearCartProduct = async (
    cartId,
    productId,
    cartProductsList
  ) => {
    try {
      if (cartProductsList.length <= 1) {
        await handleClearSingleCart(cartId);
        return;
      }
      const response = await dispatch(clearCartProduct({ cartId, productId }));
      const response1 = await dispatch(getUserCarts()).unwrap();
      setCartResponseData(response1.data);
      toast.success('product cleared successfully');
    } catch (error) {
      toast.error('Failed to clear the product ');
      throw error;
    }
  };

  let cartProductsList = null;
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Meta title="View shopping cart - E-Commerce Ninjas" />
      {isPreloader && (
        <div className="table__spinner">
          <Box sx={{ width: '100%' }}>
            <LinearProgress
              sx={{
                backgroundColor: '#fff',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#ff8a46',
                },
              }}
            />
          </Box>
        </div>
      )}
      <div className="clear-cart">
        <button className="delete" type="button" onClick={() => setOpen(true)}>
          <GiBroom className="deleteIcon" />
          <p>Delete all Carts</p>
        </button>
      </div>
      <section className="cart-section">
        <div className="cart-products">
          {cartResponseData?.carts?.map((cart: any, index) => (
            <div key={cart.id} className="cart">
              <div className="title">
                <FaCheckSquare className="check" color="#ff6d18" />
                <h2>Shopping Cart - {cart.id}</h2>
                <button
                  onClick={() =>
                    handleCartCheckOut(cart.id, index, cart.products)
                  }
                  className={`checkout-btn`}
                >
                  <span>{'Checkout'}</span>
                </button>

                <FaTrash
                  color="#ff6d18"
                  className="delete"
                  onClick={() => handleClearSingleCart(cart.cartId)}
                />
              </div>
              <div className="products-list">
                {cart.products.map((product: any) => {
                  return (
                    <div className="product-box" key={product.productId}>
                      <div className="check">
                        <FaCheckSquare color="#ff6d18" />
                      </div>
                      <div className="image">
                        <img src={product.image} alt={product.name} />
                      </div>
                      <div className="description">
                        <h4 onClick={() => navigate(`/product/${product.id}`)}>
                          {product.description}
                        </h4>
                        <div className="flexer">
                          <div className="left">
                            <span className="discount">{product.discount}</span>
                            <div className="price">${product.price}</div>
                          </div>
                          <div className="controls">
                            <div className="quantity">
                              <button
                                className="minus"
                                type="button"
                                onClick={() => decrementQuantity(product.id)}
                              >
                                <FaMinus />
                              </button>
                              <input value={product.quantity} readOnly />
                              <button
                                className="plus"
                                type="button"
                                onClick={() => incrementQuantity(product.id)}
                              >
                                <FaPlus />
                              </button>
                            </div>
                            <div className="other">
                              <button
                                className="delete"
                                type="button"
                                onClick={() =>
                                  handleClearCartProduct(
                                    cart.cartId,
                                    product.id,
                                    cart.products
                                  )
                                }
                              >
                                <FaTrash color="#ff6d18" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="checkout-details">
          <div className="voucher-shipping">
            <div className="box">
              <p>Voucher and promo</p>
              <div className="info">
                <div className="icon">
                  <FaGift />
                </div>
                <div className="text">
                  There are {cartResponseData?.carts?.length} vouchers for you.
                </div>
              </div>
            </div>
            <div className="box">
              <p>Shipping cost</p>
              <div className="info">
                <div className="icon">
                  <FaShippingFast />
                </div>
                <div className="text">$ 0.00</div>
              </div>
            </div>
          </div>
          {isCheckoutSuccess ? (
            <div className="order-details">
              <h3>Order details</h3>

              {arrayOfProduct.products.map((product, index) => (
                <div className="row" key={index}>
                  <div className="left">{product.name}:</div>
                  <div className="right">${product.price}</div>
                </div>
              ))}
              <div className="last row">
                <div className="left">Total Discount:</div>
                <div className="right">
                  ${(totalProductPrice - checkoutData).toFixed(2)}
                </div>
              </div>
              <div className="row">
                <div className="left">Total amount:</div>
                <div className="right">${checkoutData.toFixed(2)}</div>
              </div>
              <button onClick={handlePayCart}>Pay Now</button>
            </div>
          ) : null}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {'Delete all Carts'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                id="alert-dialog-description"
                sx={{ fontSize: '1.6rem' }}
              >
                Are you sure you want to delete all Carts ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                sx={{
                  backgroundColor: 'primary.main',
                  color: '#fff',
                  fontSize: '1.2rem',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                    color: '#fff',
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleClearCart}
                sx={{
                  backgroundColor: '#ff6d18',
                  color: '#fff',
                  fontSize: '1.2rem',
                  '&:hover': {
                    backgroundColor: '#e65b00',
                    color: '#fff',
                  },
                }}
                autoFocus
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </section>
    </>
  );
};

export default UserViewCart;
