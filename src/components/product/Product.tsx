/* eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiHeart } from 'react-icons/ci';
import { PiShoppingCartThin } from 'react-icons/pi';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { createCart } from '../../store/features/carts/cartSlice'; // Adjust the import path accordingly
import { toast } from 'react-toastify';

interface ProductProps {
  id: string;
  images: string[];
  name: string;
  price: string;
  stock: number;
  description: string;
  discount: number;
}

const Product: React.FC<ProductProps> = ({
  id,
  images,
  name,
  price,
  stock,
  description,
  discount,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  const handleAddProductToCart = async (productId: string, quantity = 1) => {
    const response = await dispatch(createCart({ productId, quantity }));
    if (response.payload.data) {
      toast.success(response.payload.message);
      return;
    } else if (response.payload === 'Not authorized') {
      toast.error('Please login first');
      navigate('/login');
    } else {
      toast.error(response.payload.message);
      return;
    }
  };

  return (
    <div className="product">
      <div
        className="product-image-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => navigate(`/product/${id}`)}
      >
        <span className="discount-badge">-{discount}%</span>
        <img
          src={images[currentImageIndex]}
          alt="Product"
          className="product-image"
          onClick={() => navigate(`/product/${id}`)}
        />
      </div>
      <div className="product-info">
        <div className="product-add">
          <div className="icon-container">
            <PiShoppingCartThin
              className="icon"
              onClick={() => handleAddProductToCart(id)}
            />
          </div>
          <div className="icon-container">
            <CiHeart className="icon" />
          </div>
        </div>
        <div
          className="product-name"
          onClick={() => navigate(`/product/${id}`)}
        >
          {name}
        </div>
        <div className="product-details">
          <p className="product-price">{price}</p>
          <p className="product-stock">
            <span className="stock">Stock:</span>
            {stock}
          </p>
        </div>
        <p className="product-description">
          {truncateDescription(description, 20)}
        </p>
      </div>
    </div>
  );
};

export default Product;
