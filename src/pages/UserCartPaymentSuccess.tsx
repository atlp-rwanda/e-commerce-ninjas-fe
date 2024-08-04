/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Meta } from '../components/Meta';
import { useAppDispatch, useAppSelector } from '../store/store';
import { PuffLoader, PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { checkout, getUserCarts } from '../store/features/carts/cartSlice';
import {
  FaCheckSquare,
  FaMinus,
  FaPlus,
  FaEdit,
  FaTrash,
  FaGift,
  FaShippingFast,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Product from '../components/product/Product';
import { Box, LinearProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';

const UserCartPaymentSuccess: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [currentEndpoint, setCurrentEndpoint] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    toast.success('Cart payment success');
    navigate('/shopping-cart');
  }, [location.search, navigate]);

  return (
    <>
      <Meta title="Cart payment success - E-Commerce Ninjas" />
      <div className="loader">
        <PuffLoader color="#ff6d18" size={300} loading={isLoading} />
      </div>
    </>
  );
};

export default UserCartPaymentSuccess;
