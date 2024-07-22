/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { IoMdMailUnread } from 'react-icons/io';
import { FaPhoneVolume } from 'react-icons/fa6';
import { FaBuildingCircleCheck } from 'react-icons/fa6';
import { FaRegUser } from 'react-icons/fa';
import { IoCartOutline } from 'react-icons/io5';
import { IoLogOutSharp } from 'react-icons/io5';
import { FaUserClock } from 'react-icons/fa6';
import { FaChevronDown } from 'react-icons/fa';
import { IoIosNotifications } from 'react-icons/io';
import { IoMenu } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import { Navigate, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Notifications from './notification';
import SearchInput from '../inputs/SearchInput';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchNotifications } from '../../store/features/notifications/notificationSlice';
import { getUserDetails } from '../../store/features/auth/authSlice';
import { useLocation, Link } from 'react-router-dom';
import cartService from '../../store/features/carts/cartService';
const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const location = useLocation();
  const {
    isAuthenticated,
    user,
    token: tokenLogin,
  } = useAppSelector((state) => state.auth);
  const { notifications } = useAppSelector((state) => state.notification);
  const [token, setToken] = useState('');
  const navEl = useRef<HTMLDivElement | null>(null);

  const User: any = { ...user };

  const cartsTotal = async () => {
    try {
      const carts = await cartService.getUserCarts();
      let total = 0;
      carts.data.carts.forEach((cart) => {
        total += cart.total;
      });
      return total;
    } catch (error) {
      console.error('Error fetching carts:', error);
      return 0;
    }
  };

  const [cartTotal, setCartTotal] = useState<number | null>(null);

  useEffect(() => {
    const fetchCartTotal = async () => {
      try {
        if (isAuthenticated) {
          const total = Number(await cartsTotal());
          const roundedTotal = total.toFixed(2);
          setCartTotal(Number(roundedTotal));
        } else {
          setCartTotal(Number('0.00'));
        }
      } catch (error) {
        console.error('Error fetching cart total:', error);
        setCartTotal(Number('0.00'));
      }
    };

    fetchCartTotal();
  }, [isAuthenticated]);

  const categories = Array.from({ length: 5 }, (_, i) => i + 1);
  useEffect(() => {
    if (tokenLogin.trim()) {
      setToken(tokenLogin);
    } else {
      const token = localStorage.getItem('token') || '';
      setToken(token);
    }
  }, [tokenLogin]);

  useEffect(() => {
    async function getUserDetail() {
      if (token.trim()) await dispatch(getUserDetails(token));
    }

    getUserDetail();
  }, [token, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchNotifications());
    }
  }, [dispatch, isAuthenticated]);

  function handleSetIsOpen() {
    setIsOpen((isOpen) => !isOpen);
  }

  function handleSetIsOpen2() {
    if (!isAuthenticated) {
      navigate('/login');
    }
    setIsOpen2((isOpen) => !isOpen);
  }

  function toggleNotifications() {
    setIsNotificationOpen(!isNotificationOpen);
  }

  function handleSetIsMenuOpen() {
    if (navEl.current) {
      navEl.current.classList.toggle('nav__open');
      setIsMenuOpen((isMenuOpen) => !isMenuOpen);
    }
  }

  const unreadCount = notifications
    ? notifications.filter((notification) => !notification.isRead).length
    : 0;

  return (
    <header className="header">
      <div className="header__top">
        <Link className="header__logo" to="/">
          <img
            src="../assets/images/logo.png"
            alt="Ecommerce logo"
            className="header__logo__img"
          />
          <p className="header__logo__text">
            e-Commerce <span>Ninjas</span>
          </p>
        </Link>
        <div className="header__content">
          <div className="header__box header__location">
            <FaLocationDot className="header__icon" />
            <p className="header__text">Our office</p>
            <p className="header__description">KK 4 Rd, Kigali, Rwanda</p>
          </div>
          <div className="header__box header__mail">
            <div className="header__icon">
              <IoMdMailUnread className="header__icon" />
            </div>
            <p className="header__text">Email us</p>
            <p className="header__description">support@ecommerce-ninjas.com</p>
          </div>
          <div className="header__box header__contact">
            <FaPhoneVolume className="header__icon" />
            <p className="header__text">Contact us</p>
            <p className="header__description">+250782355872</p>
          </div>
        </div>
      </div>
      <div className="header__bottom">
        <div className="header__bottom__top">
          <div className="header__menu">
            <div
              className="header__dropdown__container"
              onClick={handleSetIsOpen}
            >
              <span className="header__selected__text">
                Shopping Categories
              </span>

              <FaChevronDown
                className={`header__selected__icon${isOpen ? ' rotate2' : ''}`}
              />
            </div>
            {isOpen && (
              <div className="header__dropdown">
                <ul className="dropdown__list">
                  {categories.map((category, i) => {
                    return (
                      <li key={i}>
                        <a href="#" className="dropdown__link">
                          {i + 1}. Shopping category
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          <SearchInput className="header__input" />
          <div className="icons">
          {isAuthenticated && (
            <div className="header__notification__box">
              <IoIosNotifications
                className="header__notification__icon header__notification__icon__1"
                onClick={toggleNotifications}
              />
              <span className="header__notification__number">
                {unreadCount}
              </span>
              {isNotificationOpen && (
                <div className="notification__dropdown">
                  <Notifications />
                </div>
              )}
            </div>
          )}

          <Link className="cart__container" to="/shopping-cart">
            <IoCartOutline className="cart__icon" />
            <span className="cart__text">Cart</span>
            <span className="cart__description">
              {isAuthenticated
                ? cartTotal !== null
                  ? `$${cartTotal}`
                  : '$0'
                : '$0'}
            </span>
          </Link>

          <div
            className="cart__container user__container"
            onClick={handleSetIsOpen2}
          >
            {user && User.profilePicture ? (
              <img src={User.profilePicture} className="cart__icon" />
            ) : (
              <FaRegUser className="cart__icon-user" />
            )}

            <span className="cart__text">{user ? 'Hi, ' : 'User'}</span>
            <span className="cart__description">
              {user
                ? `${User?.firstName || User?.email?.split('@')[0]}`
                : 'Account'}
            </span>
            {isAuthenticated && isOpen2 && (
              <div className="order__dropdown">
                <ul className="order__list">
                  <li>
                    <NavLink to="/my-orders" className="order__link">
                      <FaBuildingCircleCheck className="order__icon" />
                      <span className="order__text">My Orders</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/wishlist" className="order__link">
                      <FaBuildingCircleCheck className="order__icon" />
                      <span className="order__text">WishList</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/profile-settings" className="order__link">
                      <FaUserClock className="order__icon" />
                      <span className="order__text">Profile Settings</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={'/'} className="order__link">
                      <IoLogOutSharp className="order__icon" />
                      <span className="order__text">Logout</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>
          </div>
        </div>
        <div className="header__bottom__bottom">
          <div className="menu" onClick={handleSetIsMenuOpen}>
            {isMenuOpen ? (
              <IoMdClose className="menu__icon" />
            ) : (
              <IoMenu className="menu__icon" />
            )}
          </div>
          <div className="header__nav" ref={navEl}>
            <nav>
              <ul className="header__list">
                <li className="nav__item" onClick={handleSetIsMenuOpen}>
                  <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav__item" onClick={handleSetIsMenuOpen}>
                  <NavLink
                    to="/shops"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    Shops
                  </NavLink>
                </li>
                <li className="nav__item" onClick={handleSetIsMenuOpen}>
                  <NavLink
                    to="/products"
                    className={({ isActive }) =>
                      isActive
                        ? 'active'
                        : location.pathname.startsWith('/product')
                          ? 'active'
                          : ''
                    }
                  >
                    Products
                  </NavLink>
                </li>
                <li className="nav__item" onClick={handleSetIsMenuOpen}>
                  <NavLink
                    to="/services"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    Services
                  </NavLink>
                </li>
                <li className="nav__item" onClick={handleSetIsMenuOpen}>
                  <NavLink
                    to="/contact-us"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    Contact-Us
                  </NavLink>
                </li>
                <li className="nav__item" onClick={handleSetIsMenuOpen}>
                  <NavLink
                    to="/about-us"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    About-us
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
