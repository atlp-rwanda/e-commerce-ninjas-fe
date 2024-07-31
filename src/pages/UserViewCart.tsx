/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Meta } from "../components/Meta";
import { useAppDispatch, useAppSelector } from "../store/store";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";
import { checkout, createCart, getUserCarts, clearCarts,} from "../store/features/carts/cartSlice";
import {
  FaCheckSquare,
  FaMinus,
  FaPlus,
  FaEdit,
  FaTrash,
  FaGift,
  FaShippingFast,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Box, LinearProgress } from "@mui/material";
import cartService from "../store/features/carts/cartService";

const UserViewCart: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [isPreloader, setIsPreloader] = useState(false);
  const [cartResponseData, setCartResponseData] = useState<any>(null);
  const [checkoutData, setcheckoutData] = useState(null);
  const [isCheckoutSuccess, setCheckoutSuccess] = useState(false);
  const [totalProductPrice, setTotalProductPrice] = useState(0);
  const [arrayOfProduct, setarrayOfProduct] = useState(null);
  
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});


  const cartState = useAppSelector((state) => state.cart);
  
  

  

  useEffect(() => {
  
    const fetchCarts = async () => {
      try {
        setIsLoading(true);
        const response = await dispatch(getUserCarts()).unwrap();
        if (response === "Not authorized") {
          setIsLoggedOut(true);
          toast.error("Please login first");
          navigate("/login");
        } else {
          setCartResponseData(response.data);
          const initialQuantities: { [key: string]: number } = {};
          response.data.carts.forEach((cart: any) => {
            cart.products.forEach((product: any) => {
              initialQuantities[product.id] = parseInt(product.quantity, 10); // Ensure quantity is an integer
            });
          });
          setQuantities(initialQuantities);
          calculateTotalPrice(response.data.carts); // Recalculate total price on load
          setIsLoading(false);
        }
      } catch (error: any) {
        if (error.message === "Not authorized") {
          setIsLoggedOut(true);
          toast.error("Please login first");
          navigate("/login");
        } else {
          console.error("Error fetching carts:", error);
          setIsLoading(false);
          setIsError(true);
          toast.error(error.message);
        }
      }
    };
    fetchCarts();
  }, [dispatch, navigate]);

  const handleAddProductToCart = async (productId: string, quantity:number) => {
    try {
      if (quantity < 1) return; 
      const response = await dispatch(
        createCart({ productId, quantity })
      ).unwrap();

      if (response.data) {
       
        setQuantities((prevQuantities) => ({
          ...prevQuantities,
          [productId]: quantity,
        }));
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

  const calculateTotalPrice = (carts: any) => {
    let total = 0;
    carts.forEach((cart: any) => {
      cart.products.forEach((product: any) => {
        const quantity = quantities[product.id] || product.quantity;
        total += parseFloat(product.price) * quantity;
      });
    });
    setTotalProductPrice(total);
  };


  
  const incrementQuantity = (productId: string) => {
    const currentQuantity = quantities[productId] || 1;
    handleAddProductToCart(productId,currentQuantity+1)
  };

  const decrementQuantity = (productId: string) => {
    const currentQuantity = quantities[productId] || 1;
    if (currentQuantity > 1) {
      handleAddProductToCart(productId,currentQuantity-1)

    }
  };

  const handleCartCheckOut = async (cartId, index) => {
    setIsPreloader(true);
    const response = await dispatch(checkout(cartId));
    console.log(response.payload.data);
    // response.payload.
    const array = cartResponseData.carts[index];
    setarrayOfProduct(array);
    setcheckoutData(response.payload.data.totalAmount);
    const totalProductPrice = array.products.reduce(
      (acc, product) => acc + parseFloat(product.price),
      0
    );
    setTotalProductPrice(totalProductPrice);
    setCheckoutSuccess(true);
    setIsPreloader(false);
    toast.success("Checkout is done Successfully");
  };
  const handleClearCart = async () => {
    try {
      await dispatch(clearCarts()).unwrap();
      toast.success("Cart cleared successfully");
      setCartResponseData({ ...cartResponseData, carts: [] });
      setTotalProductPrice(0);
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear the cart");
    }
  };
  const handlePrice = (price, quantity, id: any)=>{
  
  
return price*quantity
  }

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
  if (isLoggedOut) {
    return (
      <div className="error-message">
        <p>Please login or create an account first.</p>
      </div>
    );
  }

  if (!cartResponseData || cartResponseData.carts.length < 1) {
    return (
      <div className="error-message">
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <>
      <Meta title="View shopping cart - E-Commerce Ninjas" />
      {isPreloader && (
        <div className="table__spinner">
          <Box sx={{ width: "100%" }}>
            <LinearProgress
              sx={{
                backgroundColor: "#fff",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#ff8a46",
                },
              }}
            />
          </Box>
        </div>
      )}
        <div className="clear-cart">
          <button className="delete" type="button" onClick={handleClearCart}>
            <FaTrash color="#ff6d18" />
          </button>
          </div>
      <section className="cart-section">
        <div className="cart-products">
          {cartResponseData.carts.map((cart: any, index: number) => (
            <div key={cart.id} className="cart">
              <div className="title">
                <FaCheckSquare className="check" color="#ff6d18" />
                <h2>Shopping Cart</h2>
                <button
                  onClick={() => handleCartCheckOut(cart.cartId, index)}
                  className="checkout-btn"
                >
                  <span>{"Checkout"}</span>
                </button>
                <FaTrash color="#ff6d18" className="delete" />
              </div>
              <div className="products-list">
                {cart.products.map((product: any) => (
                  <div className="product-box" key={product.id}>
                    <div className="check">
                      <FaCheckSquare color="#ff6d18" />
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
                          <div className="price">${handlePrice(product.price,product.quantity,product.id)}</div>
                        </div>
                        <div className="controls">
                          <div className="quantity">
                            <button
                              className="minus"
                              type="button"
                              onClick={() => decrementQuantity(product.id)}
                            >
                              <FaMinus />
                            </button>
                            <input
                              value={product.quantity} 
                              readOnly
                            />
                            <button
                              className="plus"
                              type="button"
                              onClick={() => incrementQuantity(product.id)}
                            >
                              <FaPlus />
                            </button>
                          </div>
                          <div className="other">
                            <button className="edit" type="button">
                              <FaEdit color="#ff6d18" />
                            </button>
                            <button className="delete" type="button">
                              <FaTrash color="#ff6d18" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
                <div className="text">
                  There are {cartResponseData.carts.length} vouchers for you.
                </div>
              </div>
            </div>
            <div className="box">
              <p>Shipping cost</p>
              <div className="info">
                <div className="icon">
                  <FaShippingFast />
                </div>
                <div className="text">$ 0.00</div>
              </div>
            </div>
          </div>
          {isCheckoutSuccess && checkoutData !== null && (
            <div className="order-details">
              <h3>Order details</h3>
              {arrayOfProduct?.products.map((product: any, index: number) => (
                <div className="row" key={index}>
                  <div className="left">{product.name}:</div>
                  <div className="right">${product.price}</div>
                </div>
              ))}
              <div className="last row">
                <div className="left">Total Discount:</div>
                <div className="right">${(totalProductPrice - (checkoutData || 0)).toFixed(2)}</div>
              </div>
              <div className="row">
                <div className="left">Total amount:</div>
                <div className="right">${(checkoutData || 0).toFixed(2)}</div>
              </div>
              <button>Pay Now</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default UserViewCart;