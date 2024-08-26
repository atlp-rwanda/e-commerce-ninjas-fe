/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchProducts } from "../store/features/product/productSlice";
import Product from "../components/product/Product";
import Sample from "../components/layout/Sample";
import { PuffLoader } from "react-spinners";
import { Meta } from "../components/Meta";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { createCart, getUserCarts } from "../store/features/carts/cartSlice";
import { resetAuth } from "../store/features/auth/authSlice";


const LandingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const [cartResponseData, setCartResponseData] = useState<any>(null)
  const { products, isError, isSuccess, isLoading, message } = useAppSelector(
    (state: any) => state.products
  );
  const [visibleProducts, setVisibleProducts] = useState<number>(20);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddProductToCart = async (productId: string, quantity = 1) => {
    try {
      const response = await dispatch(
        createCart({ productId, quantity })
      ).unwrap();

      if (response.data) {
        toast.success(response.message);
        const updatedResponse = await dispatch(getUserCarts()).unwrap();
        setCartResponseData(updatedResponse.data);
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      if (error === "Not authorized") {
        localStorage.setItem("pendingCartProduct", productId);
        toast.error("Please login first");
        navigate("/login");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    }
  };
  useEffect(() => {
    const checkProductToCartPending = async () => {
      const pendingProduct = localStorage.getItem("pendingCartProduct");
      if (pendingProduct) {
        try {
          await handleAddProductToCart(pendingProduct, 1);
          localStorage.removeItem("pendingCartProduct");
        } catch (error) {
          console.error("Failed to add product to cart:", error);
        }
      }
    };

    checkProductToCartPending();
  }, []);

  const handleLoadMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 20);
  };

  return (
    <>
      <Meta title="Home - E-Commerce Ninjas" />
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
              {isSuccess &&
                Array.isArray(products) &&
                products
                .slice(0,visibleProducts)
                .map((product: any) => (
                  <Product
                    key={product.id}
                    id={product.id}
                    images={product.images}
                    name={product.name}
                    price={product.price}
                    stock={Number(product.quantity)}
                    description={product.description}
                    discount={Number(product.discount.replace("%", ""))}
                  />
                ))}
            </div>
            {visibleProducts < products.length && ( <div className="load-more">
              <button onClick={handleLoadMore}>Load More</button>
            </div>)}
          </div>
        )}
      </div>
    </>
  );
};

export default LandingPage;
