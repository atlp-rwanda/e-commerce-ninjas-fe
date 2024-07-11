/* eslint-disable */

import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Link, useNavigate } from "react-router-dom";
import { searchProduct } from "../../store/features/product/productSlice";
interface SearchInputProps {
  className: string;
  placeholder?: string;
}

function SearchInput({ className, placeholder }: SearchInputProps) {
  const dispatch = useAppDispatch();
  const { isSuccess, isError, isLoading, products } = useAppSelector(
    (state) => state.products
  );
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim()) {
      dispatch(searchProduct({ name: value.trim() }));
    } else {
      setIsFocused(false);
    }
  };

  const handleProductClick = (name: string) => {
    setSearch(name);
    setIsFocused(false);
    setIsHovered(false);
    navigate(`/search?name=${name}`);
  };

  useEffect(() => {
    if (!search.trim()) {
      setIsFocused(false);
      setIsHovered(false);
    }
  }, [search]);

  const filteredProducts = products?.filter((product: any) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="main-search">
      <form
        className={`search-container ${className}`}
        onSubmit={(e) => {
          e.preventDefault();
          if (search.trim()) {
            navigate(`/search?name=${search.trim()}`);
          }
        }}
      >
        <div className="search-icon">
          <FiSearch />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            if (!isHovered) {
              setIsFocused(false);
            }
          }}
          onChange={handleSearchChange}
          value={search}
        />
        <button
          className="search-button"
          type="submit"
          onClick={() => navigate(`/search?name=${search}`)}
        >
          Search
        </button>
      </form>
      {isFocused && search.trim() && (
        <div
          className="search-result"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product: any) => (
              <div key={product.id} className="result">
                <div
                  className="link"
                  onClick={() => handleProductClick(product.name)}
                >
                  <p>{product.name}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No products found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchInput;
