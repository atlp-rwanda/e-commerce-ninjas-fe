/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchProductsByShopId } from "../store/features/product/shopSlice";
import Product from "../components/product/Product";
import { PuffLoader } from "react-spinners";
import { Meta } from "../components/Meta";
import { toast } from "react-toastify";
import { createCart, getUserCarts } from "../store/features/carts/cartSlice";

const ProductsByShopPage: React.FC = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [cartResponseData, setCartResponseData] = useState<any>(null);

  const { shops, shopProductsByShop, isLoadingProducts, isErrorProducts, isSuccessProducts, message } = useAppSelector(
    (state: any) => state.shop
  );

  const [priceRange, setPriceRange] = useState([0, 0]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState<number>(20);

  useEffect(() => {
    if (shopId) {
      dispatch(fetchProductsByShopId(shopId));
    }
  }, [dispatch, shopId]);

  const shop = shops.find((shop: any) => shop.id === shopId);
  const products = shopProductsByShop ? shopProductsByShop[shopId] : [];

  useEffect(() => {
    if (products && products.length > 0) {
      const calculatedMaxPrice = products.reduce((max, product) => Math.max(max, product.price), 0);
      const calculatedMinPrice = products.reduce((min, product) => Math.min(min, product.price), calculatedMaxPrice);

      setMaxPrice(calculatedMaxPrice);
      setMinPrice(calculatedMinPrice);
      setPriceRange([calculatedMinPrice, calculatedMaxPrice]);
    }
  }, [products]);

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

  const filteredProducts = products.filter((product: any) => {
    const price = parseFloat(product.price);
    return price >= priceRange[0] && price <= priceRange[1];
  });

  const handleLoadMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 20);
  };

  return (
    <>
      <Meta title={`Products - Shop ${shop?.name || 'Shop'}`} />
      <div className="landing-container">
        {isLoadingProducts ? (
          <div className="loader">
            <PuffLoader color="#ff6d18" size={300} loading={isLoadingProducts} />
          </div>
        ) : isErrorProducts ? (
          <div className="error-message">
            <p>{message || "Something went wrong. Please try again later."}</p>
          </div>
        ) : (
          <div>
            <div className="head">
              <h1>{shop?.name || 'Shop'}</h1>
            </div>
            <div className="filters">
              <div>
                <label>Price Range: </label>
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                />
                <span className="span">{priceRange[0]}RWF - {priceRange[1]}RWF</span>
              </div>
            </div>
            <div className="product-list">
              {isSuccessProducts &&
                Array.isArray(filteredProducts) &&
                filteredProducts
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
            {visibleProducts < products.length && (
              <div className="load-more">
                <button onClick={handleLoadMore}>Load More</button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductsByShopPage;
