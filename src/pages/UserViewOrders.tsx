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
  userSaveOrder,
  getUserOrders,
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
import { Link } from 'react-router-dom';

const UserVIewOrders: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [orderResponseData, setOrderResponseData] = useState(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [isPreloader, setIsPreloader] = useState(false);
  const [cartResponseData, setCartResponseData] = useState(null);

  const navigate = useNavigate();

  const cartState = useAppSelector((state) => state.cart);
  useEffect(() => {
    fetchCarts();
  }, [dispatch]);
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

  useEffect(() => {
    fetchOrders();
  }, [dispatch]);
  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await dispatch(getUserOrders());
      if (response.payload === 'orders not found') {
        setIsError(true);
      }
      setOrderResponseData(response.payload.data.orders);
    } catch (error: any) {
      if (error === 'Not authorized') {
        setIsLoggedOut(true);
        toast.error('Please login first');
        navigate('/login');
      }
      console.error('Error fetching orders:', error);
      setIsLoading(false);
      setIsError(true);
      toast.error('Error getting orders, check your internet');
    } finally {
      setIsLoading(false);
    }
  };

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
        <p>No orders found.</p>
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
  if (orderResponseData.length < 1) {
    return (
      <div className="error-message">
        <p>No orders found.</p>
      </div>
    );
  }

  return (
    <>
      <Meta title="View Order history - E-Commerce Ninjas" />

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
      <section className="my-orders-section">
        <h1>Orders History</h1>
        <div className="order">
          {orderResponseData?.map((order) => (
            <React.Fragment key={order.id}>
              {typeof order.products === 'string'
                ? JSON.parse(order.products).map((product, index) => (
                    <div key={index} className="order-item">
                      <div className="head">
                        <div className="">
                          Order No: {order.id.split('-')[0]}
                        </div>
                        <div className="">Details</div>
                        <div className="">Placed on</div>
                        <div className="">Status: {order.status}</div>
                      </div>
                      <div className="order-body">
                        <div className="order-product">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="product_img"
                          />
                          <p className="o-description">
                            <h3>{product.name}</h3>
                            <br />
                            <span>x{product.quantity}</span>
                            <span className="o-price">{product.price} RWF</span>
                          </p>
                        </div>
                        <div className="order-details">
                          <Link to={''}>View Order Details</Link>
                        </div>
                        <div className="date-placed">
                          <span>
                            {new Date(order.createdAt).toDateString()}
                          </span>
                        </div>
                        <div className="track">
                          <button
                            className={
                              order.status === 'Cancelled' ? 'disabled' : ''
                            }
                            onClick={() =>
                              navigate(`/trackOrder/${order.id}/${product.id}`)
                            }
                            disabled={order.status === 'Cancelled'}
                          >
                            TRACK ORDER
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                : order.products.map((product, index) => (
                    <div key={index} className="order-item">
                      <div className="head">
                        <div className="">
                          Order No: {order.id.split('-')[0]}
                        </div>
                        <div className="">Details</div>
                        <div className="">Placed on</div>
                        <div className="">Status: {order.status}</div>
                      </div>
                      <div className="order-body">
                        <div className="order-product">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="product_img"
                          />
                          <p className="o-description">
                            <h3>{product.name}</h3>
                            <br />
                            <span>x{product.quantity}</span>
                            <span className="o-price">{product.price} RWF</span>
                          </p>
                        </div>
                        <div className="order-details">
                          <Link to={''}>View Order Details</Link>
                        </div>
                        <div className="date-placed">
                          <span>
                            {new Date(order.createdAt).toDateString()}
                          </span>
                        </div>
                        <div className="track">
                          <button
                            className={
                              order.status === 'Cancelled' ? 'disabled' : ''
                            }
                            onClick={() =>
                              navigate(`/trackOrder/${order.id}/${product.id}`)
                            }
                            disabled={order.status === 'Cancelled'}
                          >
                            TRACK ORDER
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
            </React.Fragment>
          ))}
        </div>
      </section>
    </>
  );
};

export default UserVIewOrders;