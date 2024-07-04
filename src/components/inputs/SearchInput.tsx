/* eslint-disable */

import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "../../styles/SearchInput.scss";
import { useNavigate } from "react-router-dom";
interface SearchInputProps {
  className: string;
  placeholder?: string;
}
function SearchInput({ className, placeholder }: SearchInputProps) {
  const [search,setSearch] = useState('')
const navigate = useNavigate()
  return (
    <>
    <form className={`search-container ${className}`}>
      <div className="search-icon">
        <FiSearch />
      </div>
      <input type="text" placeholder={placeholder} onChange={(e)=>setSearch(e.target.value)}/>
      <button className="search-button" onClick={()=>navigate(`/search?name=${search}`)}>Search</button>
    </form>
    <div>
    </div>
    </>

  );
}

export default SearchInput;
