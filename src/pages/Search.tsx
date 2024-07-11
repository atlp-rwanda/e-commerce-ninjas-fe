/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import SkewLoader from "react-spinners/ClipLoader";
import { useLocation, useNavigate } from "react-router-dom";
import noresults from "../../public/assets/images/noResult.png"
import Product from "../components/product/Product";
import { searchProduct } from "../store/features/product/productSlice";

const SearchBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const initialName = params.get("name") || "";
  const initialCategory = params.get("category") || "";
  const initialMaxPrice = params.get("maxPrice") || "";
  const initialMinPrice = params.get("minPrice") || "";
  const initialDiscount = params.get("discount") || "";

  const [name, setName] = useState(initialName);
  const [category, setCategory] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [discount, setDiscount] = useState(initialDiscount);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      searchProduct({
        name: name || undefined,
        category: category || undefined,
        maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
        minPrice: minPrice ? parseInt(minPrice) : undefined,
        discount: discount ? parseInt(discount) : undefined,
      })
    );
  }, [dispatch, name, category, maxPrice, minPrice, discount]);

  const { isSuccess, isError, isLoading, products } = useAppSelector(
    (state) => state.products
  );

  const handleFilterChange = (filter: string, value: string) => {
    const newParams = new URLSearchParams(location.search);
    if (value) {
      newParams.set(filter, value);
    } else {
      newParams.delete(filter);
    }
    navigate({ search: newParams.toString() });
  };

  useEffect(() => {
    setName(initialName);
    setCategory(initialCategory);
    setMaxPrice(initialMaxPrice);
    setMinPrice(initialMinPrice);
    setDiscount(initialDiscount);
  }, [initialName, initialCategory, initialMaxPrice, initialMinPrice, initialDiscount]);

  const filteredProduct = products
    ? products.find(
        (product: any) =>
          (!name || product.name.toLowerCase() === name.toLowerCase()) &&
          (!category || product.category === category) &&
          (!maxPrice || product.price <= parseInt(maxPrice)) &&
          (!minPrice || product.price >= parseInt(minPrice)) &&
          (!discount || parseInt(product.discount) >= parseInt(discount))
      )
    : null;

  return (
    <>
    <div className="wrappers">
      <div className="product-search">
        <div className="main-content-product">
          <div className="upper-side">
            <span className="product-name">{name}:</span>
            <div className="filter-option">
              <div className="selection-part">
                <span className="searchSpan-price">Price:</span>
                <select
                  className="dropdown-select"
                  value={minPrice}
                  onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                >
                  <option value="">Min</option>
                  <option value="10">$10</option>
                  <option value="20">$20</option>
                </select>
                <select
                  className="dropdown-select"
                  value={maxPrice}
                  onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                >
                  <option value="">Max</option>
                  <option value="50">$50</option>
                  <option value="10">$10</option>
                  <option value="100">$100</option>
                </select>
              </div>
              <div>
                <span className="search-Span-price">Discount:</span>
                <select
                  className="dropdown-select"
                  value={discount}
                  onChange={(e) => handleFilterChange("discount", e.target.value)}
                >
                  <option value="">Discount</option>
                  <option value="5%">5%</option>
                  <option value="10%">10%</option>
                </select>
              </div>
            </div>
          </div>
          <div className="product-main">
            {isLoading ? (
              <div className="loader-spinner">
                <SkewLoader color={"#FF6D18"} loading={isLoading} size={100} />
              </div>
            ) : isSuccess && filteredProduct ? (
              <div className="product-list">
                <Product
                  key={filteredProduct.id}
                  images={filteredProduct.images}
                  name={filteredProduct.name}
                  price={`$${filteredProduct.price}`}
                  stock={Number(filteredProduct.quantity)}
                  description={filteredProduct.description}
                  discount={Number(filteredProduct.discount.replace("%", ""))}
                />
              </div>
            ) : isError ? (
              <div className="error-message">
                <p>{"Something went wrong. Please try again later."}</p>
              </div>
            ) : (

            <div className="noResult">
              <div>
               <img src={noresults} alt="" />
             </div> 
             <div>
             <h1>No products found matching your search criteria.</h1>
             </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};


export default SearchBar;
