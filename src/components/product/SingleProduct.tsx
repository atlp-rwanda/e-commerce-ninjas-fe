/* eslint-disable */
import React, { useEffect, useState } from "react";
import { IProduct, IProductReview } from "../../utils/types/product";
import { IShop } from "../../utils/types/product";
import { FaCartPlus, FaRegStar, FaStar } from "react-icons/fa";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchSingleProduct } from "../../store/features/product/singleProductSlice";
import { PuffLoader } from "react-spinners";
import { IProductInitialResponse } from "../../utils/types/store";
import { Meta } from "../Meta";
import { Link } from "react-router-dom";
import truncateString from "../../utils/text/truncateString";
import UserDefaultImage from "../../../public/assets/images/user.png";
import ImageSlider from "../images/ImageSlider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createCart } from "../../store/features/carts/cartSlice";

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

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, [dispatch]);
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
              reviews={product.productReviews}
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
        <ImageSlider images={images} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
      </div>
    </div>

  );
}

const ProductDetails = ({
  product,
  reviews,
}: {
  product: IProduct;
  reviews: IProductReview[] | null;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const addProductToWishlist = () => {
    return;
  };
  const handleAddProductToCart = async (productId: string, quantity = 1) => {
    const response = await dispatch(createCart({ productId, quantity }));
    if (response.payload.data) {
      toast.success(response.payload.message);
      return;
    } else if (response.payload === "Not authorized") {
      toast.error("Please login first");
      navigate("/login");
    } else {
      toast.error(response.payload.message);
      return;
    }
  };

  return (
    <div className="product-details">
      <h1 className="product-title">{product.name}</h1>
      <p className="upper-description">
        {truncateString(product.description || "", 200)}
      </p>
      <div className="product-stars-and-shipping">
        <div className="product-review-stars">
          {" "}
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
            Discounted price of {product.discount}
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
        <button className="wishlist-button" onClick={addProductToWishlist}>
          <FaHeartCircleCheck /> Add to WishList
        </button>
        <button
          className="cart-button"
          onClick={() => handleAddProductToCart(product.id)}
        >
          <FaCartPlus /> Add to cart
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
