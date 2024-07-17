/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useLocation, useNavigate } from "react-router-dom";
import noresults from "../../public/assets/images/noResult.png";
import Product from "../components/product/Product";
import { searchProduct } from "../store/features/product/productSlice";
import { PuffLoader } from "react-spinners";
import CustomSelect from "../components/Dropdown/CustomSelect";

interface Option {
  label: string;
  value: string;
}

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
  const [selectPrice, setSelectPrice] = useState<Array<number>>([]);
  const [discountOptions, setDiscountOptions] = useState<Option[]>([]);
  const [minPriceOptions, setMinPriceOptions] = useState<Option[]>([]);
  const [maxPriceOptions, setMaxPriceOptions] = useState<Option[]>([]);
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

  useEffect(() => {
    if (products && products.length > 0) {
      const sortedPrices = Array.from(
        new Set(products.map((product: any) => product.price))
      ).sort((a, b) => a - b);
      setSelectPrice(sortedPrices);

      const priceOptions = sortedPrices.map(price => ({ label: `$${price}`, value: price.toString() }));
      setMinPriceOptions([{ label: 'Min', value: '' }, ...priceOptions]);
      setMaxPriceOptions([{ label: 'Max', value: '' }, ...priceOptions.slice(1)]);

      const sortedDiscounts = Array.from(
        new Set(products.map((product: any) => product.discount))
      )
        .sort((a, b) => parseInt(a) - parseInt(b))
        .map((discount) => ({ label: `${discount}`, value: discount }));
      setDiscountOptions([{ label: 'Discount', value: '' }, ...sortedDiscounts]);
    }
  }, [products]);

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
  }, [
    initialName,
    initialCategory,
    initialMaxPrice,
    initialMinPrice,
    initialDiscount,
  ]);

  const filteredProducts = products
    ?.filter(
      (product: any) =>
        product.name.toLowerCase().includes(name.toLowerCase()) &&
        (!category || product.category === category) &&
        (!maxPrice || product.price <= parseInt(maxPrice)) &&
        (!minPrice || product.price >= parseInt(minPrice)) &&
        (!discount || parseInt(product.discount) >= parseInt(discount))
    )
    .sort((a: any, b: any) => a.price - b.price);

  useEffect(() => {
    if (filteredProducts && filteredProducts.length > 0) {
      const sortedPrices = Array.from(
        new Set(filteredProducts.map((product: any) => product.price))
      ).sort((a, b) => a - b);
      setSelectPrice(sortedPrices);

      const priceOptions = sortedPrices.map(price => ({ label: `$${price}`, value: price.toString() }));
      setMinPriceOptions([{ label: 'Min', value: '' }, ...priceOptions]);
      setMaxPriceOptions([{ label: 'Max', value: '' }, ...priceOptions.slice(1)]);

      const sortedDiscounts = Array.from(
        new Set(filteredProducts.map((product: any) => product.discount))
      )
        .sort((a, b) => parseInt(a) - parseInt(b))
        .map((discount) => ({ label: `${discount}`, value: discount }));
      setDiscountOptions([{ label: 'Discount', value: '' }, ...sortedDiscounts]);
    }
  }, [filteredProducts]);

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
                  <CustomSelect
                    options={minPriceOptions}
                    onSelect={(selected) => {
                      setMinPrice(selected);
                      handleFilterChange("minPrice", selected);
                    }}
                    value={minPrice}
                  />
                  <CustomSelect
                    options={maxPriceOptions}
                    onSelect={(selected) => {
                      setMaxPrice(selected);
                      handleFilterChange("maxPrice", selected);
                    }}
                    value={maxPrice}
                  />
                </div>
                <div className="discount-display">
                  <span className="search-Span-price">Discount:</span>
                  <CustomSelect
                    options={discountOptions}
                    onSelect={(selected) => {
                      setDiscount(selected);
                      handleFilterChange("discount", selected);
                    }}
                    value={discount}
                  />
                </div>
              </div>
            </div>
            <div className="product-main">
              {isLoading ? (
                <div className="loader">
                  <PuffLoader color="#ff6d18" size={300} loading={isLoading} />
                </div>
              ) : isSuccess &&
                filteredProducts &&
                filteredProducts.length > 0 ? (
                <div className="product-list">
                  {filteredProducts.map((product:any) => (
                    <Product
                      key={product.id}
                      id={product.id}
                      images={product.images}
                      name={product.name}
                      price={`$${product.price}`}
                      stock={Number(product.quantity)}
                      description={product.description}
                      discount={Number(product.discount.replace("%", ""))}
                    />
                  ))}
                </div>
              ) : isError ? (
                <div className="error-message">
                  <p>Something went wrong. Please try again later.</p>
                </div>
              ) : (
                <div className="noResult">
                  <div>
                    <img src={noresults} alt="No results" />
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