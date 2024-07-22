/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Meta } from '../components/Meta';
import { useAppDispatch, useAppSelector } from '../store/store';
import { PuffLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { getUserCarts } from '../store/features/carts/cartSlice';
import {
  FaCheckSquare,
  FaMinus,
  FaPlus,
  FaEdit,
  FaTrash,
  FaGift,
  FaShippingFast,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UserViewCart: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [cartData, setCartData] = useState<any>(null);
  const navigate = useNavigate();

  const cartState = useAppSelector((state) => state.cart);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        setIsLoading(true);
        const response = await dispatch(getUserCarts()).unwrap();
        console.log('Cart response:', response);
        setCartData(response.data);
        setIsLoading(false);
      } catch (error: any) {
        console.error('Error fetching carts:', error);
        setIsLoading(false);
        setIsError(true);
        toast.error(error.message);
      }
    };
    fetchCarts();
  }, [dispatch]);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
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
      <div className="error-message">
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <>
      <Meta title="View shopping cart - E-Commerce Ninjas" />
      <section className="cart-section">
        <div className="cart-products">
          {cartData.carts.map((cart: any) => (
            <div key={cart.id} className="cart">
              <div className="title">
                <FaCheckSquare className="check" color="#ff6d18" />
                <h2>Shopping Cart</h2>
                <FaTrash color="#ff6d18" className='delete' />
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
                            <span className="discount">
                              {product.discount}
                            </span>
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
                <div className="text">$ 0.00</div>
              </div>
            </div>
          </div>
          <div className="order-details">
            <h3>Order details</h3>
            <div className="row">
              <div className="left">Total amount:</div>
              <div className="right">$5000</div>
            </div>
            <div className="row">
              <div className="left">Total amount:</div>
              <div className="right">$5000</div>
            </div>
            <div className="row last">
              <div className="left">Total amount:</div>
              <div className="right">$5000</div>
            </div>
            <div className="row">
              <div className="left">Total amount:</div>
              <div className="right">$5000</div>
            </div>
            <button>Checkout</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserViewCart;
