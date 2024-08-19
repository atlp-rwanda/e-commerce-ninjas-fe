/* eslint-disable */
import React, { useEffect, useState } from "react";
import { GiBroom } from "react-icons/gi";
import { useAppDispatch, useAppSelector } from '../store/store';
import Product from "../components/product/Product";
import { addProductToWishlist, removeProductFromWishlist, fetchWishlistProducts } from '../store/features/wishlist/wishlistSlice';

const WishList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items, isError, isSuccess, isLoading, message } = useAppSelector((state) => state.wishlist);

    useEffect(() => {
        dispatch(fetchWishlistProducts());
        }, [dispatch]);
  if(isSuccess){
    console.log(items);
  }
  return (
    <>
      <div className="wishListPage">
        <div className="top">
          <div>
            <h1>My Wishlist</h1>
          </div>
          <div>
            <button className="delete">
              <GiBroom className="deleteIcon" />
              Clear WishList
            </button>
          </div>
        </div>
        <div className="wishlistProducts">
          <div>
          {isSuccess &&
                Array.isArray(items) &&
                items
               .map((product: any) => (
               <Product
                    key={product.id}
                    id={product.id}
                    images={product.images}
                    name={product.name}
                    price={product.price}
                    stock={Number(product.quantity)}
                    description={product.description} 
                  /> 
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WishList;


