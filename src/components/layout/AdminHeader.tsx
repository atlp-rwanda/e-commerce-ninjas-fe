/* eslint-disable */
import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { FaEnvelope } from "react-icons/fa";

function AdminHeader() {
  return (
    <header className="admin-header">
      <div className="header__logo">
        <img
          src="logo.png"
          alt="Ecommerce logo"
          className="header__logo__img"
        />
        <p className="header__logo__text">
          e-Commerce <span>Ninjas</span>
        </p>
      </div>
      <div className="header__notification__box">
        <IoIosNotifications className="header__notification__icon header__notification__icon__1" />
        <span className="header__notification__number">10</span>
      </div>
      <div className="header__notification__box">
        <FaEnvelope className="header__notification__icon" />
        <span className="header__notification__number">30</span>
      </div>
      <div className="header__user__box">
        <img src="person.jpg" alt="UI face" className="header__user__img" />
        <p className="header__text">
          Hi, <span className="header__user__name">Emmanuel</span>
        </p>
      </div>
    </header>
  );
}

export default AdminHeader;
