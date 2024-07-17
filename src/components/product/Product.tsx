/* eslint-disable */
import React, { useState, useRef } from 'react';
import { CiHeart } from "react-icons/ci";
import { PiShoppingCartThin } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';

interface ProductProps {
  id: string;
  images: string[];
  name: string;
  price: string;
  stock: number;
  description: string;
  discount: number;
}

const Product: React.FC<ProductProps> = ({ id, images, name, price, stock, description, discount }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate()

  const handleMouseEnter = () => {
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setCurrentImageIndex(0);
  };

  const truncateDescription = (desc: string, length: number) => {
    return desc.length > length ? `${desc.substring(0, length)}...` : desc;
  };

  return (
    <div className="product" onClick={()=>navigate(`/product/${id}`)}>
      <div
        className="product-image-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="discount-badge">{discount}%</span>
        <img src={images[currentImageIndex]} alt="Product" className="product-image" />
      </div>
      <div className="product-info">
        <div className="product-add">
          <div className="icon-container"><PiShoppingCartThin className="icon" /></div>
          <div className="icon-container"><CiHeart className="icon" /></div>
        </div>
        <div className="product-name">{name}</div>
        <div className="product-details">
          <p className="product-price">{price}</p>
          <p className="product-stock"><span className="stock">Stock:</span>{stock}</p>
        </div>
        <p className="product-description">{truncateDescription(description, 20)}</p>
      </div>
    </div>
  );
};

export default Product;