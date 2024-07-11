/* eslint-disable */
import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";


function SellerHeader() {
  return (
    <header className="seller-header">
      <p className="header__title">Dashboard</p>
      <div className="header__notification__box">
        <IoIosNotifications className="header__notification__icon header__notification__icon__1" />
        <span className="header__notification__number">10</span>
      </div>
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
