/* eslint-disable */
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchProducts } from '../store/features/product/productSlice';
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Product from '../components/product/Product';
import Sample from '../components/layout/Sample';
import { PuffLoader } from 'react-spinners';
import "../styles/LandingPage.scss";
import { Meta } from '../components/Meta';

const LandingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, isError, isSuccess, isLoading, message } = useAppSelector((state: any) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Sample />
      <div className="landing-container">
        {isLoading ? (
          <div className="loader">
            <PuffLoader color="#ff6d18" size={300} loading={isLoading} />
          </div>
        ) : isError ? (
          <div className="error-message">
            <p>{message || "Something went wrong. Please try again later."}</p>
          </div>
        ) : (
          <div>
            <div className="head">
              <h1>Today's Deal</h1>
            </div>
            <div className="product-list">
              {isSuccess && products.map((product: any) => (
                <Product
                  key={product.id}
                  images={product.images}
                  name={product.name}
                  price={`$${product.price}`}
                  stock={Number(product.quantity)}
                  description={product.description}
                  discount={Number(product.discount.replace('%', ''))}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
