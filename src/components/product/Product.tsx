/* eslint-disable */
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { PiShoppingCartThin } from "react-icons/pi";
import { useAppDispatch, useAppSelector } from '../../store/store';
import { createCart, getUserCarts } from "../../store/features/carts/cartSlice";
import { addProductToWishlist, removeProductFromWishlist, fetchWishlistProducts } from '../../store/features/wishlist/wishlistSlice';
import { toast } from "react-toastify";
import aos from "aos"

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
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const isProductInWishlist = wishlist.some((item: any) => item.id === id);
  const [isInWishlist, setIsInWishlist] = useState(isProductInWishlist);

  useEffect(()=>{
    aos.init({ once: true });
  },[]);
  useEffect(() => {
    setIsInWishlist(isProductInWishlist);
  }, [isProductInWishlist]);

  useEffect(() => {
    dispatch(fetchWishlistProducts());
  }, [dispatch]);

  const [isLoading, setIsLoading] = useState(false);
  const [cartResponseData, setCartResponseData] = useState<any>(null);
  const { cartProductslist } = useAppSelector((state) => state.cart)

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
    return cartProductslist?.includes(productId);
  }


  const handleToggleWishlist = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!isAuthenticated) {
      localStorage.setItem("pendingWishlistProduct", id);
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (isInWishlist) {
      dispatch(removeProductFromWishlist(id)).then((action) => {
        if (action.meta.requestStatus === 'fulfilled') {
          toast.success("Product removed from wishlist.");
          setIsInWishlist(false);
        } else {
          toast.error(action.payload as string);
        }
      });
    } else {
      dispatch(addProductToWishlist(id)).then((action) => {
        if (action.meta.requestStatus === 'fulfilled') {
          toast.success("Product added to wishlist.");
          setIsInWishlist(true);
        } else {
          toast.error(action.payload as string);
        }
      });
    }
  };



  return (
    <div className="product" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1000">
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
          <div className="icon-container" onClick={handleToggleWishlist}>
            {isInWishlist ? <BsHeartFill className="icon" /> : <BsHeart className="icon" />}
          </div>
        </div>
        <div
          className="product-name"
          onClick={() => navigate(`/product/${id}`)}
        >
          {name}
        </div>
        <div className="product-details">
          <p className="product-price">{price} RWF</p>
          <p className="product-stock">
            <span className="stock">Stock: </span>
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