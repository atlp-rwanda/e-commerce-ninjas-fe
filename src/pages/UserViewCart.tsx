/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Meta } from "../components/Meta";
import { useAppDispatch, useAppSelector } from "../store/store";
import { PuffLoader, PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import {
  getUserCarts,
  checkout,
  payment,
} from "../store/features/carts/cartSlice";
import {
  FaMinus,
  FaPlus,
  FaEdit,
  FaTrash,
  FaGift,
  FaShippingFast,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserViewCart: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [cartData, setCartData] = useState<any>(null);
  const [checkoutData, setcheckoutData] = useState(null);
  const [checkedCarts, setCheckedCarts] = useState(new Set());
  const [isPreloader, setPreloader] = useState(false);
  const [isCheckoutSuccess, setCheckoutSuccess] = useState(null);
  const navigate = useNavigate();

  const cartState = useAppSelector((state) => state.cart);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        setIsLoading(true);
        const response = await dispatch(getUserCarts()).unwrap();
        console.log("Cart response:", response);
        setCartData(response.data);
        setIsLoading(false);
      } catch (error: any) {
        console.error("Error fetching carts:", error);
        setIsLoading(false);
        setIsError(true);
        toast.error(error.message);
      }
    };
    fetchCarts();
  }, [dispatch]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="loader">
        <PuffLoader color="#ff6d18" size={300} loading={isLoading} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error-message">
        <p>Failed to load cart products. Please try again later.</p>
      </div>
    );
  }

  if (!cartData || cartData.carts.length === 0) {
    return (
      <div className="no-products">
        <p>Your cart is empty.</p>
      </div>
    );
  }

  const handleCartCheckboxChange = (cartId: string) => (event) => {
    const newCheckedCarts = new Set(checkedCarts);
    if (event.target.checked) {
      newCheckedCarts.add(cartId);
    } else {
      newCheckedCarts.delete(cartId);
    }
    setCheckedCarts(newCheckedCarts);
  };
  const paymentNavigation = () => {
    if (checkedCarts instanceof Set) {
      const cartId = Array.from(checkedCarts)[0];
      dispatch(payment(cartId as string));
    } else {
      console.error("checkedCarts is not a Set or an array");
    }
  };
  const handleCheckoutClick = () => {
    const checkedIds: any = Array.from(checkedCarts);
    if (checkedIds !== null && checkedIds.length === 1) {
      const Checkout = async (checkedIds) => {
        setPreloader(true);
        const response = await dispatch(checkout(checkedIds));
        setcheckoutData(response.payload.data.totalAmount);
        setCheckoutSuccess(true);
        setPreloader(false);
        toast.success("Checkout is done Successfully");
      };
      Checkout(checkedIds);
    } else if (checkedIds.length > 1) {
      toast.error("Select Single Cart");
    } else {
      toast.error("No Cart Selected");
    }
  };
  return (
    <>
      <Meta title="View shopping cart - E-Commerce Ninjas" />
      <section className="cart-section">
        <div className="cart-products">
          {cartData.carts.map((cart: any) => (
            <div key={cart.cartId} className="cart">
              <div className="title">
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  onChange={handleCartCheckboxChange(cart.cartId)}
                />
                <h2>Shopping Cart</h2>
              </div>
              <div className="products-list">
                {cart.products.map((product: any) => {
                  return (
                    <div className="product-box" key={product.productId}>
                      <div className="check">
                        <input
                          type="checkbox"
                          id={`cartCheckbox-${product.productId}}`}
                          className="custom-checkbox"
                        />
                      </div>
                      <div className="image">
                        <img src={product.image} alt={product.name} />
                      </div>
                      <div className="description">
                        <h4 onClick={() => navigate(`/product/${product.id}`)}>
                          {product.name}
                        </h4>
                        <div className="flexer">
                          <div className="left">
                            <span className="discount">{product.discount}</span>
                            <div className="price">${product.price}</div>
                          </div>
                          <div className="controls">
                            <div className="quantity">
                              <button className="minus" type="button">
                                <FaMinus />
                              </button>
                              <input
                                type="number"
                                value={product.quantity}
                                readOnly
                              />
                              <button className="plus" type="button">
                                <FaPlus />
                              </button>
                            </div>
                            <div className="other">
                              <button className="delete" type="button">
                                <FaTrash color="#ff6d18" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="checkout-details">
          <div className="voucher-shipping">
            <div className="box">
              <p>Voucher and promo</p>
              <div className="info">
                <div className="icon">
                  <FaGift />
                </div>
                <div className="text">There are 2 vouchers for you.</div>
              </div>
            </div>
            <div className="box">
              <p>Shipping cost</p>
              <div className="info">
                <div className="icon">
                  <FaShippingFast />
                </div>
                <div className="text">$8000</div>
              </div>
            </div>
          </div>
          <div className="order-details">
            <h3>Order details</h3>
            <div className="row">
              <div className="left">Total amount:</div>
              <div className="right">{checkoutData}$</div>
            </div>
            {!isCheckoutSuccess ? (
              <button
                className={`${isPreloader ? " loading" : ""}`}
                disabled={isPreloader}
                onClick={handleCheckoutClick}
              >
                <span>{isPreloader ? "Loading " : "Check out"}</span>
                <PulseLoader size={6} color="#ffe2d1" loading={isPreloader} />
              </button>
            ) : (
              <button onClick={paymentNavigation}>Proceed To Payment</button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default UserViewCart;
