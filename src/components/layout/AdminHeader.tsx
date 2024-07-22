/* eslint-disable */
import React, { useEffect } from "react";
import { IoIosNotifications } from "react-icons/io";
import { FaEnvelope } from "react-icons/fa";
import logo from "../../../public/assets/images/logo.png";
import { getUserDetails } from '../../store/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
function AdminHeader() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  useEffect(()=>{
    dispatch(getUserDetails(localStorage.getItem('token')));
},[dispatch,getUserDetails]);
const User:any = {...user}
  return (
    <header className="admin-header">
      <div className="header__admin__logo">
        <img
          src={logo}
          alt="Ecommerce logo"
          className="header__admin__logo__img"
        />
        <p className="header__admin__logo__text">
          e-Commerce <span>Ninjas</span>
        </p>
      </div>
      <div className="header__admin__notifications__box">
        <IoIosNotifications className="header__admin__notifications__icon header__notifications__icon__1" />
        <span className="header__admin__notifications__number">0</span>
      </div>
      <div className="header__admin__notifications__box">
        <FaEnvelope className="header__admin__notifications__icon" />
        <span className="header__admin__notifications__number">0</span>
      </div>
      <div className="header__admin__user__box">
        <img src={User.profilePicture} alt="UI face" className="header__admin__user__img" />
        <p className="header__admin__text">
          Hi, <span className="header__admin__user__name">{User?.firstName || User?.email?.split('@')[0]}</span>
        </p>
      </div>
    </header>
  );
}

export default AdminHeader;
