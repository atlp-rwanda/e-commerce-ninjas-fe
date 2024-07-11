/* eslint-disable */

import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import "../../styles/SearchInput.scss";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Link, useNavigate } from "react-router-dom";
import {
  searchProduct,
  selectSearchResults,
  selectSearchError,
} from "../../store/features/ProductSlice";
interface SearchInputProps {
  className: string;
  placeholder?: string;
}
function SearchInput({ className, placeholder }: SearchInputProps) {
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector(selectSearchResults);
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isHoved, setIsHoved] = useState(false);

  const navigate = useNavigate();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim()) {
      dispatch(searchProduct({ name: value.trim() }));
    }
  };
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
          onBlur={() => setIsFocused(false)}
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
      {(isFocused || isHoved) && (
        <div className="search-result" onMouseEnter={()=> setIsHoved(true)}>
          {searchResults.length > 0 ? (
            searchResults.map((product: any) => (
              <div key={product.id} className="result">
                <Link to={`/search?name=${product.name}`} className="link">
                  <p >{product.name}</p>
                </Link>
              </div>
            )
            )
          ) :null
          }
        </div>
      )}
    </div>
  );
}

export default SearchInput;
