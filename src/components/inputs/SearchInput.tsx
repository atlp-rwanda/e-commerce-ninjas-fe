/* eslint-disable */
import React from "react";
import { FiSearch } from "react-icons/fi";

interface SearchInputProps {
  className?: string;
  placeholder?: string;
}

function SearchInput({ className, placeholder }: SearchInputProps) {
  return (
    <form className={`search-container ${className}`}>
      <div className="search-icon">
        <FiSearch />
      </div>
      <input type="text" placeholder={placeholder} />
      <button className="search-button">Search</button>
    </form>
  );
}

export default SearchInput;
