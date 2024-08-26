/* eslint-disable*/
import React, { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import logo from "../../../public/assets/images/logo.png";
import { getUserDetails } from '../../store/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import Notifications from './notification';
import { fetchNotifications } from '../../store/features/notifications/notificationSlice';
import useSocket from '../../hooks/useSocket';
import { getToken } from "../../utils/protectRoute/ProtectedRoute";

function AdminHeader() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  useEffect(()=>{
    const token = getToken();
    dispatch(getUserDetails(token));
    dispatch(fetchNotifications());
},[dispatch,getUserDetails]);
const User:any = {...user}

const [isNotificationOpen, setIsNotificationOpen] = useState(false);
const { notifications } = useAppSelector((state) => state.notification);
useSocket();

function toggleNotifications() {
  setIsNotificationOpen(!isNotificationOpen);
}
const unreadCount = notifications
  ? notifications.filter((notification) => !notification.isRead).length
  : 0;

  return (
    <header className="admin-header">
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
      <div className="header__notifications__box">
        <IoIosNotifications
         className="header__notifications__icon header__notifications__icon__1"
         onClick={toggleNotifications} />
        <span className="header__notifications__number">{unreadCount}</span>
        {isNotificationOpen && (
          <div className="header__notifications__dropdown">
            <Notifications />
          </div>
        )}
      </div>
      <div className="header__user__box">
        <img src={User.profilePicture} alt="UI face" className="header__user__img" />
        <p className="header__text">
          Hi, <span className="header__user__name">{User.firstName}</span>
        </p>
      </div>
    </header>
  );
}

export default AdminHeader;