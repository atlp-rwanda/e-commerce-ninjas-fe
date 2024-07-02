/* eslint-disable */
import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMailUnread } from "react-icons/io";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaBuildingCircleCheck } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { IoLogOutSharp } from "react-icons/io5";
import { FaUserClock } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";

import "../../styles/Header.scss";

import SearchInput from "../inputs/SearchInput";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const categories = Array.from({ length: 5 }, (_, i) => i + 1);

  function handleSetIsOpen() {
    setIsOpen((isOpen) => !isOpen);
  }

  function handleSetIsOpen2() {
    setIsOpen2((isOpen) => !isOpen);
  }

  return (
    <header className="header">
      <div className="header__top">
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
                className={`header__selected__icon${isOpen ? " rotate" : ""}`}
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
          <div className="cart__container">
            <IoCartOutline className="cart__icon" />
            <span className="cart__text">Cart</span>
            <span className="cart__description">$ 100</span>
          </div>
          <div
            className="cart__container user__container"
            onClick={handleSetIsOpen2}
          >
            <FaRegUser className="cart__icon" />
            <span className="cart__text">User</span>
            <span className="cart__description">Account</span>
            {isOpen2 && (
              <div className="order__dropdown">
                <ul className="order__list">
                  <li>
                    <a href="#" className="order__link">
                      <FaBuildingCircleCheck className="order__icon" />
                      <span className="order__text">My Orders</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="order__link">
                      <FaBuildingCircleCheck className="order__icon" />
                      <span className="order__text">WishList</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="order__link">
                      <FaUserClock className="order__icon" />
                      <span className="order__text">Profile Settings</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="order__link">
                      <IoLogOutSharp className="order__icon" />
                      <span className="order__text">Login</span>
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="header__bottom__bottom">
          <div className="header__nav">
            <nav>
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Shops</a>
                </li>
                <li>
                  <a href="#">Products</a>
                </li>
                <li>
                  <a href="#">Services</a>
                </li>
                <li>
                  <a href="#">Contact-Us</a>
                </li>
                <li>
                  <a href="#">About-us</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;