/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import SkewLoader

from "react-spinners/ClipLoader";
import "../styles/search.scss";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import {
  searchProduct,
  selectSearchResults,
  selectSearchError,
} from "../store/features/ProductSlice";
import { useLocation } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa6";
import Product from "../components/product/Product";

const SearchBar: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const name = params.get("name");
  const category = params.get("category");
  const maxPrice = params.get("maxPrice");
  const minPrice = params.get("minPrice");
const [loading,setLoading] = useState(false)
useEffect(()=>{
setLoading(true)
setTimeout(()=>{
setLoading(false)
},1000)
},[])

  const dispatch = useAppDispatch();
  const searchResults = useAppSelector(selectSearchResults);
  const searchError = useAppSelector(selectSearchError);
  useEffect(() => {
    dispatch(
      searchProduct({
        name: name ? name : undefined,
        category: category ? category : undefined,
        maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
        minPrice: minPrice ? parseInt(minPrice) : undefined,
      })
    );
  }, []);
  return (
    <>
      <Header />
      {
        loading ?  <SkewLoader

        color={"#FF6D18"} loading={loading}size={70}/>
        :
        <>
        <div className="product-search">
            <div className="main-content-product">
              <div className="right-side-bar">
                <div className="searchPrice-box">
                  <span className="product-name">{name}:</span>
                  <span className="searchSpan-price">Price:</span>
                  <div className="dropdown-container">
                    <select className="min-span">
                      <option value="">Min</option>
                      <FaChevronDown className="header__selected__iconIcon" />
                      <option value="10">$10</option>
                      <option value="20">$20</option>
                    </select>
                    <select className="max-span">
                      <option value="">Max</option>
                      <FaChevronDown className="header__selected__iconIcon" />
                      <option value="50">$50</option>
                      <option value="100">$100</option>
                    </select>
                    <span className="searchSpan-price">Discount:</span>
                    <select className="max-span">
                      <option value="">Discount</option>
                      <FaChevronDown className="header__selected__iconIcon" />
                      <option value="5">5%</option>
                      <option value="10">10%</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div><div className="product-main">
              <div className="landing-container">
                {false ? (
                  <div className="loader"></div>
                ) : searchError ? (
                  <div className="error-message">
                    <p>{"Something went wrong. Please try again later."}</p>
                  </div>
                ) : (
                  <div>
                    <div className="product-list">
                      {searchResults &&
                        searchResults.map((product: any) => (
                          <Product
                            key={product.id}
                            images={product.images}
                            name={product.name}
                            price={`$${product.price}`}
                            stock={Number(product.quantity)}
                            description={product.description}
                            discount={Number(product.discount.replace("%", ""))} />
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            </>
      }
      
      <Footer />
    </>
  );
};

export default SearchBar;
