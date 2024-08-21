/* eslint-disable */
import React, { useEffect, useState } from "react";
import { IProduct, IProductReview } from "../../utils/types/product";
import { IShop } from "../../utils/types/product";
import { FaCartPlus, FaHeart, FaRegHeart, FaRegStar, FaStar } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchSingleProduct } from "../../store/features/product/singleProductSlice";
import { PuffLoader } from "react-spinners";
import { IProductInitialResponse } from "../../utils/types/store";
import { Meta } from "../Meta";
import { Link } from "react-router-dom";
import {truncateString} from "../../utils/text/truncateString";
import UserDefaultImage from "../../../public/assets/images/user.png";
import ImageSlider from "../images/ImageSlider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createCart, getUserCarts } from "../../store/features/carts/cartSlice";
import { addProductToWishlist, removeProductFromWishlist , fetchWishlistProducts} from '../../store/features/wishlist/wishlistSlice';

const ProductComponent = ({ productId }: { productId: string }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    product,
    isError,
    isSuccess,
    isLoading,
    message,
  }: IProductInitialResponse = useAppSelector(
    (state: any) => state.singleProduct
  );
  const wishlist = useAppSelector((state: any) => state.wishlist.items);
  const isProductInWishlist = wishlist.some((item: any) => item.id === productId);
  const isAuthenticated = useAppSelector((state: any) => state.auth.isAuthenticated);

  const [isInWishlist, setIsInWishlist] = useState(isProductInWishlist);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
    dispatch(fetchWishlistProducts());
  }, [dispatch, productId]);

  useEffect(() => {
    setIsInWishlist(isProductInWishlist);
  }, [isProductInWishlist]);

  const handleToggleWishlist = async () => {
    if (!isAuthenticated) {
      localStorage.setItem("pendingWishlistProduct", productId);
      toast.error("Please login first");
      navigate("/login");
       return;
    }

    setWishlistLoading(true);
    try {
      if (isInWishlist) {
        const action = await dispatch(removeProductFromWishlist(productId));
        if (action.meta.requestStatus === 'fulfilled') {
          toast.success("Product removed from wishlist.");
          setIsInWishlist(false);
        } else {
          toast.error(action.payload as string);
        }
      } else {
        const action = await dispatch(addProductToWishlist(productId));
        if (action.meta.requestStatus === 'fulfilled') {
          toast.success("Product added to wishlist.");
          setIsInWishlist(true);
        } else {
          toast.error(action.payload as string);
        }
      }
    } finally {
      setWishlistLoading(false);
    }
  };


  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, [dispatch, productId]);

  return (
    <>
      <Meta title={`Product details - ${productId}`} />
      {isLoading ? (
        <div className="loader">
          <PuffLoader color="#ff6d18" size={300} loading={isLoading} />
        </div>
      ) : isError ? (
        <div className="error-message">
          <p>{message || "Something went wrong. Please try again later."}</p>
          <Link to="/" className="btn-link">
            View all products
          </Link>
        </div>
      ) : product ? (
        <div className="product-component">
          <div className="product-container">
            <ProductImages images={product.images} />
            <ProductDetails
              product={product}
              reviews={product.productReviews}  handleToggleWishlist={handleToggleWishlist} 
              isInWishlist={isInWishlist}
              wishlistLoading={wishlistLoading}
            />
          </div>
          <DetailsCard title="Product Details">
            {product.description}
          </DetailsCard>
          <DetailsCard title="Customer reviews">
            <ReviewsCard reviews={product.productReviews} />
          </DetailsCard>
          <DetailsCard title="Seller's info">
            <SellerInfoCard shop={product.shops} />
          </DetailsCard>
        </div>
      ) : (
        <div className="error-message">
          <p>Product was not found</p>
          <Link to="/" className="btn-link">
            View all products
          </Link>
        </div>
      )}
    </>
  );
};

const ProductImages = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  return (
    <div className="images-container">
      <div className="thumbnails-container">
        {images.slice(0, 4).map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Product Thumbnail ${index + 1}`}
            className={`thumbnail-image ${selectedImage === index && "active"}`}
            onMouseEnter={() => setSelectedImage(index)}
          />
        ))}
      </div>

      <div className="main-image-container">
        <ImageSlider
          images={images}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      </div>
    </div>
  );
};

const ProductDetails = ({
  product,  handleToggleWishlist,
  reviews,
  wishlistLoading,
  isInWishlist
}: {
  product: IProduct;
  isInWishlist: boolean;
  wishlistLoading: boolean;
  reviews: IProductReview[] | null;
  handleToggleWishlist: () => void; })  => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [cartResponseData, setCartResponseData] = useState<any>(null);

  const handleAddProductToCart = async (
    productId: string,
    quantity: number
  ) => {
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
        localStorage.setItem("pendingCartProduct",product.id);
        toast.error("Please login first");
        navigate("/login");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isInCart = (productId: string) => {
    return cartResponseData?.carts?.some((cart: any) =>
      cart.products.some((product: any) => product.id === productId)
    );
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

  return (
    <div className="product-details">
      <h1 className="product-title">{product.name}</h1>
      <p className="upper-description">
        {truncateString(product.description || "", 200)}
      </p>
      <div className="product-stars-and-shipping">
        <div className="product-review-stars">
          <StarsRender
            count={
              reviews && reviews.length > 0
                ? Math.floor(
                    reviews.reduce((acc, review) => {
                      return acc + review.rating;
                    }, 0) / reviews.length
                  )
                : 0
            }
          />
          {(reviews && reviews.length > 0
            ? reviews.reduce((acc, review) => {
                return acc + review.rating;
              }, 0) / reviews.length
            : 0
          ).toFixed(1)}{" "}
        </div>
        <div className="shipping-label">Free Shipping</div>
      </div>
      <div className="product-price-container">
        <div className="product-price">
          {product.price.toLocaleString()} RWF
        </div>
        <div className="discount-label-container">
          <div className="discount-label">
            Discounted price of -{product.discount}
          </div>
        </div>
      </div>
      <div className="quantity-container">
        <label className="quantity-label">Quantity:</label>
        <div className="quantity-input-and-buttons">
          <button className="quantity-button" onClick={() => setQty(qty - 1)}>
            -
          </button>
          <input
            type="number"
            name="quantity"
            className="quantity-input"
            value={qty}
            onChange={(e) => setQty(parseInt(e.target.value))}
          />
          <button className="quantity-button" onClick={() => setQty(qty + 1)}>
            +
          </button>
        </div>
      </div>
      <div className="action-buttons">
      <button
          className="wishlist-button"
          onClick={handleToggleWishlist}
          disabled={wishlistLoading}
        >
          {wishlistLoading ? (
            <PuffLoader color="#fff" size={20} />
          ) : (
            <span> {isInWishlist ? <FaHeart /> : <FaRegHeart />} {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
          )}
        </button>
        <button
          className="cart-button"
          onClick={() => handleAddProductToCart(product.id, qty)}
          disabled={isLoading}
        >
        
          {isLoading ? (
            <PuffLoader color="#fff" size={20} />
          ) : isInCart(product.id) ? (
            <>
              <FaCartPlus /> Update Cart
            </>
          ) : (
            <>
              <FaCartPlus /> Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const DetailsCard = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="card-container">
      <div className="card-header">
        <div className="card-header-title">
          <h1>{title}</h1>
        </div>
        <div className="card-header-box"></div>
      </div>
      <div className="card-contents">{children}</div>
    </div>
  );
};

const SellerInfoCard = ({ shop }: { shop: IShop | null }) => {
  return (
    <div className="seller-info">
      <div className="seller-profile">
        <div className="img-holder">
          <img src={(shop && shop.image) || UserDefaultImage} alt="Shop" />{" "}
        </div>
        <span>{shop && shop.name}</span>
      </div>
      <div className="seller-description">{shop && shop.description}</div>
    </div>
  );
};

const ReviewsCard = ({ reviews }: { reviews: IProductReview[] | null }) => {
  return (
    <div className="reviews-card">
      <div className="reviews-header">
        <span className="reviews-top-stars">
          <StarsRender
            count={
              reviews && reviews.length > 0
                ? Math.floor(
                    reviews.reduce((acc, review) => {
                      return acc + review.rating;
                    }, 0) / reviews.length
                  )
                : 0
            }
          />
          {reviews && reviews.length > 0
            ? (
                reviews.reduce((acc, review) => {
                  return acc + review.rating;
                }, 0) / reviews.length
              ).toFixed(1)
            : 0}{" "}
          out of 5
        </span>
        <span>{reviews ? reviews.length.toLocaleString() : 0} Reviewers</span>
      </div>
      <h2>Top reviewers</h2>
      <div className="reviews">
        {reviews && reviews.length > 0
          ? reviews.map((review) => <SingleReviewCard review={review} />)
          : "No reviews"}
      </div>
    </div>
  );
};

const SingleReviewCard = ({ review }: { review: IProductReview }) => {
  return (
    <div className="review-card">
      <div className="reviewer-profile">
        <div className="img-holder">
          <img
            src={review.user?.profilePicture || UserDefaultImage}
            alt="Shop"
          />{" "}
        </div>
        <span>
          {`${review.user?.firstName} ${" "} ${review.user?.lastName} `}{" "}
        </span>
      </div>
      <div className="review-contents">
        <div className="stars-container">
          <StarsRender count={review.rating} />
        </div>
        <div className="review-date">
          Reviewed on{" "}
          {new Date(review.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <div className="review-feedback">{review.feedback}</div>
      </div>
    </div>
  );
};

const StarsRender = ({ count }: { count: number }) => {
  const totalStars = 5;

  return (
    <div className="stars-card">
      {[...Array(totalStars)].map((_, index) =>
        index < count ? (
          <FaStar key={index} color="#ff6d18" />
        ) : (
          <FaRegStar key={index} color="#ff6d18" />
        )
      )}
    </div>
  );
};

export default ProductComponent;