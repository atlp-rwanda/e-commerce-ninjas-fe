/* eslint-disable */
import React, { useState, useEffect } from "react";
import { IoIosNotifications } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { useAppSelector, useAppDispatch } from "../../store/store";
import Notifications from './notification';
import { fetchNotifications } from '../../store/features/notifications/notificationSlice';
import useSocket from '../../hooks/useSocket';
import logo from "../../../public/assets/images/logo.png";

function SellerHeader() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { notifications } = useAppSelector((state) => state.notification);
  useSocket();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchNotifications());    
    }
  }, [dispatch, isAuthenticated]);

  function toggleNotifications() {
    setIsNotificationOpen(!isNotificationOpen);
  }
  const unreadCount = notifications
    ? notifications.filter((notification) => !notification.isRead).length
    : 0;
  
  return (
    <header className="seller-header">
        <div className="header__logo">
        <img
          src={logo}
          alt="Ecommerce logo"
          className="header__logo__img"
        />
        <p className="header__logo__text">
          e-Commerce <span>Ninjas</span>
        </p>
      </div>
      {isAuthenticated && (
      <div className="header__notificationss__box">
        <IoIosNotifications
          className="header__notificationss__icon header__notificationss__icon__1"
          onClick={toggleNotifications}
        />
        <span className="header__notificationss__number">{unreadCount}</span>
        {isNotificationOpen && (
          <div className="header__notificationss__dropdown">
            <Notifications />
          </div>
        )}
      </div>
      )}
      <div className="line"></div>
      <div className="header__theme__container">
        <div className="header__theme header__theme--active header__theme__light">
          <MdLightMode className="header__theme__icon" />
          <span className="header__theme__text">Light</span>
        </div>
        <div className="header__theme header__theme__dark">
          <MdDarkMode className="header__theme__icon" />
          <span className="header__theme__text">Dark</span>
        </div>
      </div>
    </header>
  );
}

export default SellerHeader;
