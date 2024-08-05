/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../store/store';
import { userTrackOrderStatus } from '../store/features/carts/cartSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PuffLoader } from 'react-spinners';
import { fetchUserProfile } from '../store/features/user/userSlice';

const TrackerOrder = () => {
  const dispatch = useAppDispatch();
  const [orderResponseData, setOrderResponseData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [isError, setIsError] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<any>(null);

  const { orderId, productId } = useParams<{
    orderId: string;
    productId: string;
  }>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrackOrderStatus();
  }, [dispatch, orderId]);

  const fetchTrackOrderStatus = async () => {
    try {
      setIsLoading(true);
      const response = await dispatch(userTrackOrderStatus(orderId));
      console.log('RRR', response.payload.data);
      const profile: any = await dispatch(fetchUserProfile());
      setShippingAddress(profile.payload.addresses);
      console.log('User profile', profile);
      if (response.payload === 'Not authorized') {
        setIsLoggedOut(true);
        toast.error('Please login first');
        navigate('/login');
        return;
      }
      setOrderResponseData(response.payload.data);
      setIsLoading(false);
    } catch (error: any) {
      if (error.message === 'Not authorized') {
        setIsLoggedOut(true);
        toast.error('Please login first');
        navigate('/login');
        return;
      }
      console.error('Error fetching carts:', error);
      setIsLoading(false);
      setIsError(true);
      toast.error(error.message);
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
        <p>No cart found.</p>
      </div>
    );
  }

  if (isLoggedOut) {
    return (
      <div className="error-message">
        <p>Please login or create an account first.</p>
      </div>
    );
  }

  const productsJSON = orderResponseData?.order?.products;
  let products = [];

  if (productsJSON) {
    try {
      products = JSON.parse(productsJSON);
    } catch (error) {
      console.error('Failed to parse products JSON', error);
    }
  }

  const product = products.find((product) => product.id === productId);

  return (
    <div className="order-details-container">
      <div className="order-details">
        <h2>Order Details</h2>
        <p>
          <strong>ORDER ID:</strong> {orderResponseData?.order.id.split('-')[0]}
        </p>
        <div>
          <p>Your order status: {orderResponseData?.order.status}</p>
          {shippingAddress ? (
            <p>
              <strong>Shipping Address:</strong> {shippingAddress.province},{' '}
              {shippingAddress.district}, {shippingAddress.sector},{' '}
              {shippingAddress.cell}
            </p>
          ) : (
            <p>
              <strong>Shipping Address:</strong> Not provided
            </p>
          )}
          <div className="description">
            <p>
              <strong>
                Total
                <br />
                <br />
              </strong>
              <b>${product ? product.quantity * product.price : 0}</b>
            </p>
            <p>
              <strong>
                Tracking Number
                <br />
                <br />
              </strong>
              <b>{orderResponseData?.order.id.split('-')[0]}</b>
            </p>
          </div>
        </div>
        {product && <img src={product.image} alt={product.name} />}
        {product && <p>{product.name}</p>}
      </div>
      <div className="delivery-timeline">
        <div className="heading">
          <h3>Delivery Timeline</h3>
        </div>
        <ul>
          <li>
            <div className="circle"></div>
            <div>
              <p>{orderResponseData?.order.shippingProcess}</p>
              <span>
                {new Date(orderResponseData?.order.updatedAt).toDateString()}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TrackerOrder;
