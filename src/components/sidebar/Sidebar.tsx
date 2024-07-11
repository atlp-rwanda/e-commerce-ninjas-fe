/* eslint-disable */
import React, { useState } from "react";
import { IoLogOutSharp } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { FaBuildingCircleCheck } from "react-icons/fa6";
import { AiFillDashboard } from "react-icons/ai";
import { FaShop } from "react-icons/fa6";
import { FaBoxArchive } from "react-icons/fa6";


function Sidebar() {
  const [isActive, setIsActive] = useState(false);

  function handleSetActive() {
    setIsActive((isActive) => !isActive);
  }

  return (
    <div className="sidebar">
      <div className="sidebar__content">
        <p className="sidebar__title">
          e-Commerce<span>Ninjas</span>
        </p>
        <ul className="sidebar__content__list sidebar__list">
          <li className="sidebar__item">
            <a href="#" className="sidebar__link">
              <AiFillDashboard className="sidebar__icon" />
              <span>Dashboard</span>
            </a>
          </li>
          <li className="sidebar__item">
            <a href="#" className="sidebar__link">
              <IoIosPeople className="sidebar__icon" />
              <span>Customers</span>
            </a>
          </li>
          <li className="sidebar__item">
            <a href="#" className="sidebar__link">
              <FaShop className="sidebar__icon" />
              <span>Shop</span>
            </a>
          </li>
          <li className="sidebar__item" onClick={handleSetActive}>
            <div className="sidebar__link">
              <FaBoxArchive className="sidebar__icon" />
              <span>Product</span>
              <span
                className={`sidebar__inner__icon ${isActive ? "rotate" : ""}`}
              >
                &gt;
              </span>
            </div>
          </li>
          {isActive && (
            <div className="dropdown">
              <ul>
                <li className="sidebar__inner__item sidebar__inner__item--active">
                  <a
                    href="#"
                    className="sidebar__inner__link sidebar__inner__link--active"
                  >
                    Add product
                  </a>
                </li>
                <li>
                  <a href="#" className="sidebar__inner__link">
                    Product List
                  </a>
                </li>
              </ul>
            </div>
          )}
          <li className="sidebar__item">
            <a href="#" className="sidebar__link">
              <FaBuildingCircleCheck className="sidebar__icon" />
              <span>Orders</span>
            </a>
          </li>
          <li className="sidebar__item sidebar__logout">
            <a href="#" className="sidebar__link">
              <IoLogOutSharp className="sidebar__icon" />
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
