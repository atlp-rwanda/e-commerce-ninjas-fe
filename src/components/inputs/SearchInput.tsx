/* eslint-disable */

import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import "../../styles/SearchInput.scss";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useNavigate } from "react-router-dom";
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
  const searchError = useAppSelector(selectSearchError);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <form className={`search-container ${className}`}>
        <div className="search-icon">
          <FiSearch />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          onChange={(e) => {
            setSearch(e.target.value);
            dispatch(searchProduct({ name: e.target.value }));
          }}
        />
        <button
          className="search-button"
          onClick={() => navigate(`/search?name=${search}`)}
        >
          Search
        </button>
      </form>
      <div style={{ display: search ? "block" : "none" }}>
        {searchResults.length > 0 ? (
          searchResults.map((product: any) => (
            <p key={product.id}>{product.name}</p>
          ))
        ) : (
          <p>No product</p>
        )}
      </div>
    </div>
  );
}

export default SearchInput;
