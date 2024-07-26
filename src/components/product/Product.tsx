/* eslint-disable */
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { PiShoppingCartThin } from "react-icons/pi";
import { useAppDispatch } from "../../store/store";
import { createCart, getUserCarts } from "../../store/features/carts/cartSlice";
import { toast } from "react-toastify";

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

  const [isLoading, setIsLoading] = useState(false);
  const [cartResponseData, setCartResponseData] = useState<any>(null);

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
    setIsLoading(true);
    try {
      const response = await dispatch(
        createCart({ productId, quantity })
      ).unwrap();

      if (response.data) {
        toast.success(response.message);
        const updatedResponse = await dispatch(getUserCarts()).unwrap();
        setCartResponseData(updatedResponse.data);
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      if (error === "Not authorized") {
        localStorage.setItem("pendingCartProduct", productId);
        toast.error("Please login first");
        navigate("/login");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await dispatch(getUserCarts()).unwrap();
        setCartResponseData(response.data);
      } catch (error: any) {
        console.error("Error fetching carts:", error);
      }
    };
    fetchCarts();
  }, [dispatch]);

  const isInCart = (productId: string) => {
    return cartResponseData?.carts?.some((cart: any) =>
      cart.products.some((product: any) => product.id === productId)
    );
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
          <div
            className="icon-container"
            style={{ background: isLoading ? "#ff6d18" : isInCart(id) ? "#ff6d18" : "transparent" }}
          >
            {isLoading ? (
              <PiShoppingCartThin
                className={`icon ${isInCart(id) ? "icon-in-cart" : ""}`}
                style={{ color: "#fff" }}
                onClick={() => handleAddProductToCart(id)}
                aria-label={isInCart(id) ? "Remove from cart" : "Add to cart"}
              />
            ) : (
              <PiShoppingCartThin
                className={`icon ${isInCart(id) ? "icon-in-cart" : ""}`}
                style={{ color: isInCart(id) ? "#fff" : "#ff6d18" }}
                onClick={() => handleAddProductToCart(id)}
                aria-label={isInCart(id) ? "Remove from cart" : "Add to cart"}
              />
            )}
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
