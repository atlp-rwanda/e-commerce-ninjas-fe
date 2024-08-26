/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMailUnread } from "react-icons/io";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaBuildingCircleCheck } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { IoLogOutSharp } from "react-icons/io5";
import { FaUserClock } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { Navigate, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Notifications from "./notification";
import SearchInput from "../inputs/SearchInput";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchNotifications } from "../../store/features/notifications/notificationSlice";
import {
  change2FAStatus,
  getUserDetails,
} from "../../store/features/auth/authSlice";
import { useLocation, Link } from "react-router-dom";
import logo from "../../../public/assets/images/logo.png";
import useSocket from "../../hooks/useSocket";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import HomePage from "./HomePage";
import { getToken } from "../../utils/protectRoute/ProtectedRoute";

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
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [is2FALoading, setIs2FALoading] = useState(false);
  const navEl = useRef<HTMLDivElement | null>(null);
  const { cartCounter, cartTotalMoney } = useAppSelector((state) => state.cart);
  useSocket();
  const categories = Array.from({ length: 5 }, (_, i) => i + 1);

  const token = getToken();
  useEffect(() => {
      if (token?.trim()) {
        dispatch(getUserDetails(token));
      }
  }, [dispatch,token]);

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
      navigate("/login");
    }else{
      setIsOpen2((isOpen) => !isOpen);
    }
  }

  function toggleNotifications() {
    setIsNotificationOpen(!isNotificationOpen);
  }

  function handleSetIsMenuOpen() {
    if (navEl.current) {
      navEl.current.classList.toggle("nav__open");
      setIsMenuOpen((isMenuOpen) => !isMenuOpen);
    }
  }

  const unreadCount = notifications
    ? notifications.filter((notification) => !notification.isRead).length
    : 0;

  function formatName(name: string) {
    const trimmedName = name?.trim();
    const formattedName = trimmedName?.replace(/\s+/g, ".");
    return formattedName?.length > 5
      ? formattedName?.substring(0, 5) + "..."
      : formattedName;
  }

  const switch2FA = async () => {
    const successMessage = `2FA ${is2FAEnabled ? "Disabled" : "Enabled, Login now."}`;
    setIs2FALoading(true);
    const res = await dispatch(change2FAStatus({ newStatus: !is2FAEnabled }));
    setIs2FALoading(false);
    if (res.type === "auth/change-2fa-status/fulfilled") {
      toast.success(
        (!is2FAEnabled
          ? `${res.payload.message}, Login now.`
          : res.payload.message) || successMessage
      );
      if (!is2FAEnabled) {
        navigate("/logout");
      }
      setIs2FAEnabled(res.payload.data.user.is2FAEnabled || !is2FAEnabled);
    } else {
      toast.error(res.payload);
    }
  };

  useEffect(() => {
    if (user) setIs2FAEnabled(user.is2FAEnabled);
  }, [user]);

  return (
    <>
    <HomePage isAuthenticated={isAuthenticated} userRole={user?.role}/>
    <header className="header">
      <div className="header__top">
        <Link className="header__logo" to="/">
          <img src={logo} alt="Ecommerce logo" className="header__logo__img" />
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
            <p className="header__description">ecommerceninjas45@gmail.com</p>
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
                className={`header__selected__icon${isOpen ? " rotate2" : ""}`}
              />
            </div>
            {isOpen && (
              <div className="header__dropdown">
                <ul className="dropdown__list">
                  {categories.map((category, i) => (
                    <li key={i}>
                      <a href="#" className="dropdown__link">
                        {i + 1}. Shopping category
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <SearchInput className="header__input" />
          <div className="icons">
            {isAuthenticated && (
              <div className="header__notification__box notification_box_cont">
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
            <Link className="cart__container cart__details" to="/shopping-cart">
              <div className="cart__icons_row">
                {isAuthenticated ? (
                  <div className="header__notification__box cart_icon_box">
                    <IoCartOutline className="header__notification__icon header__notification__icon__1" />
                    <span className="header__notification__number">
                      {cartCounter}
                    </span>
                  </div>
                ) : (
                  <div className="header__notification__box cart_icon_box">
                    <IoCartOutline className="header__notification__icon header__notification__icon__1" />
                    <span className="header__notification__number">0</span>
                  </div>
                )}
                <div className="cart_box_info">
                  <span className="cart__text">Cart</span>
                  <span className="cart__description">
                    {isAuthenticated
                      ? cartTotalMoney !== null
                        ? `${cartTotalMoney.toFixed(2)} RWF`
                        : "0 RWF"
                      : "0 RWF"}
                  </span>
                </div>
              </div>
            </Link>

            <div
              className="cart__container user__container"
              onClick={handleSetIsOpen2}
            >
              {user && user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  className="cart__icon"
                  alt="User Profile"
                />
              ) : (
                <FaRegUser className="cart__icon-user" />
              )}
              <span className="cart__text">{user ? "Hi, " : "User"}</span>
              <span className="cart__description">
                {user
                  ? formatName(user?.firstName || user?.email?.split("@")[0])
                  : "Account"}
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
                      <NavLink to="/logout" className="order__link">
                        <IoLogOutSharp className="order__icon" />
                        <span className="order__text">Logout</span>
                      </NavLink>
                    </li>
                  </ul>
                  <button
                    type="button"
                    className="order__2fa_btn"
                    onClick={switch2FA}
                    disabled={is2FALoading}
                  >
                    {is2FALoading ? (
                      is2FAEnabled ? (
                        <>
                          Disabling 2FA{" "}
                          <PulseLoader
                            size={3}
                            color="#ffe2d1"
                            loading={is2FAEnabled}
                          />
                        </>
                      ) : (
                        <>
                          Enabling 2FA{" "}
                          <PulseLoader
                            size={3}
                            color="#ffe2d1"
                            loading={is2FAEnabled}
                          />
                        </>
                      )
                    ) : is2FAEnabled ? (
                      "Disable 2FA"
                    ) : (
                      "Enable 2FA"
                    )}
                  </button>
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
                {isAuthenticated && (
                  <li className="nav__item" onClick={handleSetIsMenuOpen}>
                    <NavLink
                      to="/home"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Home
                    </NavLink>
                  </li>
                )}
                <li className="nav__item" onClick={handleSetIsMenuOpen}>
                  <NavLink
                    to="/shops"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Shops
                  </NavLink>
                </li>
                <li className="nav__item" onClick={handleSetIsMenuOpen}>
                  <NavLink
                    to="/products"
                    className={({ isActive }) =>
                      isActive
                        ? "active"
                        : location.pathname.startsWith("/product")
                          ? "active"
                          : ""
                    }
                  >
                    Products
                  </NavLink>
                </li>
                <li className="nav__item" onClick={handleSetIsMenuOpen}>
                  <NavLink
                    to="/services"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Services
                  </NavLink>
                </li>
                <li className="nav__item" onClick={handleSetIsMenuOpen}>
                  <NavLink
                    to="/contact-us"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Contact-Us
                  </NavLink>
                </li>
                <li className="nav__item" onClick={handleSetIsMenuOpen}>
                  <NavLink
                    to="/about-us"
                    className={({ isActive }) => (isActive ? "active" : "")}
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
    </>
  );
};

export default Header;