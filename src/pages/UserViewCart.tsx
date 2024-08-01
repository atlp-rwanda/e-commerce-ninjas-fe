/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Meta } from "../components/Meta";
import { useAppDispatch, useAppSelector } from "../store/store";
import { PuffLoader, PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { checkout, getUserCarts , clearCarts,createCart,clearCart,clearCartProduct} from "../store/features/carts/cartSlice";
import {
  FaCheckSquare,
  FaMinus,
  FaPlus,
  FaEdit,
  FaTrash,
  FaGift,
  FaShippingFast,
} from "react-icons/fa";
import { GiBroom } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Product from "../components/product/Product";
import { Box, LinearProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Dispatch from 'react';


const UserViewCart: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [cartData, setCartData] = useState<any>(null);
  const [cartResponseData, setCartResponseData] = useState(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [checkoutData, setcheckoutData] = useState(null);
  const [isCheckoutSuccess, setCheckoutSuccess] = useState(null);
  const [isPreloader, setIsPreloader] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [totalProductPrice, setTotalProductPrice] = useState(0);
  const [arrayOfProduct, setarrayOfProduct] = useState(null);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [open,setOpen] = useState(false)
  

  const navigate = useNavigate();

  const cartState = useAppSelector((state) => state.cart);

  

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        setIsLoading(true);
        const response = await dispatch(getUserCarts());
        const response1 = await dispatch(getUserCarts()).unwrap();
        if (response.payload === "Not authorized") {
          setIsLoggedOut(true);
          toast.error("Please login first");
          navigate("/login");
        }
        setCartResponseData(response1.data);
        setIsLoading(false);
      } catch (error: any) {
        if (error === "Not authorized") {
          setIsLoggedOut(true);
          toast.error("Please login first");
          navigate("/login");
        }
        console.error("Error fetching carts:", error);
        setIsLoading(false);
        setIsError(true);
        toast.error(error.message);
      }
    };
    fetchCarts();
  }, [dispatch]);

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
        <p>Please login or create account first.</p>
      </div>
    );
  }

  if (!cartResponseData || cartResponseData?.carts?.length < 1) {
    return (
      <div className="error-message">
        <p>Your cart is empty.</p>
      </div>
    );
  }

  const handleCartCheckOut = async (cartId, index) => {
    setIsPreloader(true);
    const response = await dispatch(checkout(cartId));
    const array = cartResponseData?.carts[index];
    setarrayOfProduct(array);
    setcheckoutData(response.payload.data.totalAmount);
    const totalProductPrice = array.products.reduce(
      (acc, product) => acc + parseFloat(product.price) * (product.quantity || 1),
      0
    );
    setTotalProductPrice(totalProductPrice);
    setCheckoutSuccess(true);
    setIsPreloader(false);
    toast.success("Checkout is done Successfully");
  };

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
  const handleClearCart = async () => {
    try {
      await dispatch(clearCarts()).unwrap();
      const response1 = await  dispatch(getUserCarts()).unwrap();
      setCartResponseData(response1.data);

      toast.success("Cart cleared successfully");
      setCartResponseData({ ...cartResponseData, carts: [] });
      setTotalProductPrice(0);
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear the cart");
    }
  };
  const handleClearSingleCart = async (cartId) => {
  
    try {
        await dispatch(clearCart(cartId));
        const response1 = await  dispatch(getUserCarts()).unwrap();
        setCartResponseData(response1.data);
        const remainingCarts = cartResponseData.carts.filter((cart)=>cart.cartId !== cartId)
        setCartResponseData({...cartResponseData,carts:remainingCarts});
        
    
        toast.success("Cart cleared successfully");
    } catch (error) {
        console.error("Error clearing cart:", error);
        toast.error("Failed to clear the cart");
    }
};
const handleClearCartProduct = async(cartId,productId)=>{
  try {
    const response = await dispatch(clearCartProduct({cartId,productId}))
    const response1 = await  dispatch(getUserCarts()).unwrap();
    setCartResponseData(response1.data);
    console.log("Clear product",response);
    toast.success("product cleared successfully");
  } catch (error) {
    toast.error("Failed to clear the product ");
    throw error 
  }
}


const handleClose = () => {
 
  setOpen(false);
};

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
          <button className="delete" type="button" onClick={()=>setOpen(true)} >
            <GiBroom className="deleteIcon" />
            <p>Delete all Carts</p>
          </button>
          </div>
      <section className="cart-section">
        <div className="cart-products">
          {cartResponseData?.carts?.map((cart: any, index) => (
            <div key={cart.id} className="cart">
              <div className="title">
                <FaCheckSquare className="check" color="#ff6d18" />
                <h2>Shopping Cart</h2>
                <button
                  onClick={() => handleCartCheckOut(cart.cartId, index)}
                  className={`checkout-btn`}>
                  <span>{"Checkout"}</span>
                </button>

                <FaTrash color="#ff6d18" className="delete" onClick={()=>handleClearSingleCart(cart.cartId)}/>
              </div>
              <div className="products-list">
                {cart.products.map((product: any) => {
                  return (
                    <div className="product-box" key={product.productId}>
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
                            <div className="price">${product.price}</div>
                          </div>
                          <div className="controls">
                            <div className="quantity">
                              <button className="minus" type="button" onClick={() => decrementQuantity(product.id)}>
                                <FaMinus />
                              </button>
                              <input
                                value={product.quantity}
                                readOnly
                              />
                              <button className="plus" type="button" onClick={() => incrementQuantity(product.id)}>
                                <FaPlus />
                              </button>
                            </div>
                            <div className="other">
                              <button className="delete" type="button" onClick={()=>handleClearCartProduct(cart.cartId,product.id)}>
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
                <div className="text">
                  There are {cartResponseData?.carts?.length} vouchers for you.
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
          {isCheckoutSuccess ? (
            <div className="order-details">
              <h3>Order details</h3>

              {arrayOfProduct.products.map((product, index) => (
                <div className="row" key={index}>
                  <div className="left">{product.name}:</div>
                  <div className="right">${product.price}</div>
                </div>
              ))}
              <div className="last row">
                <div className="left">Total Discount:</div>
                <div className="right">${(totalProductPrice - checkoutData).toFixed(2)}</div>
              </div>
              <div className="row">
                <div className="left">Total amount:</div>
                <div className="right">${checkoutData.toFixed(2)}</div>
              </div>
              <button>Pay Now</button>
            </div>
          ) : null}
            <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete all Carts"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              sx={{ fontSize: "1.6rem" }}
            >
              Are you sure you want to delete all Carts ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              sx={{
                backgroundColor: "primary.main",
                color: "#fff",
                fontSize: "1.2rem",
                "&:hover": {
                  backgroundColor: "primary.dark",
                  color: "#fff",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleClearCart}
              sx={{
                backgroundColor: "#ff6d18",
                color: "#fff",
                fontSize: "1.2rem",
                "&:hover": {
                  backgroundColor: "#e65b00",
                  color: "#fff",
                },
              }}
              autoFocus
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        </div>
      </section>
    </>
  );
};

export default UserViewCart;
