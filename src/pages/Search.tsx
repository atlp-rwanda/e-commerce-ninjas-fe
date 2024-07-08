/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  searchProduct,
  selectSearchResults,
  selectSearchError,
} from "../store/features/ProductSlice";
import { useLocation } from "react-router-dom";

const SearchBar: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const name = params.get("name");
  const category = params.get("category");
  const maxPrice = params.get("maxPrice");
  const minPrice = params.get("minPrice");

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
    <div>
      <h1>search</h1>
      {searchError && <p>Error: {searchError}</p>}
      <div>
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((product: any) => (
              <li key={product.id}>
                {product.name} : ${product.price}
              </li>
            ))}
          </ul>
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
