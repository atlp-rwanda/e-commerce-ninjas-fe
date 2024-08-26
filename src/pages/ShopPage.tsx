/* eslint-disable */
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchAllShops } from '../store/features/product/shopSlice';
import { Meta } from "../components/Meta";
import ShopCard from '../components/product/ShopCard';
import { PuffLoader } from 'react-spinners';

const ShopPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { shops, isLoadingShops, isErrorShops, isSuccessShops } = useAppSelector((state) => state.shop);

  useEffect(() => {
    dispatch(fetchAllShops());
  }, [dispatch]);

  return (
    <>
      <Meta title="Shops - E-Commerce Ninjas" />
      <div className="shop-container">
        {isLoadingShops ? (
          <div className="loader">
            <PuffLoader color="#ff6d18" size={300} loading={isLoadingShops} />
          </div>
        ) : isErrorShops ? (
          <p>Something went wrong. Please try again later.</p>
        ) : isSuccessShops && shops && shops.length > 0 ? (
          shops.map((shop) => (
            <ShopCard key={shop.id} shopId={shop.id} />
          ))
        ) : (
          <p>No shops available</p>
        )}
      </div>
    </>
  );
};

export default ShopPage;
