/* eslint-disable */

import React from "react";
import "../../styles/Categories.scss";

function Categories() {
  return (
    <div className="categories__container">
      <div className="categories">
        <div className="categories__box categories__box__1">
          <img
            src="left-top.png"
            alt="Product image"
            className="categories__img"
          />
          <div className="categories__content">
            <p className="categories__text">Men's shoes</p>
            <button className="categories__btn">View &gt;</button>
          </div>
        </div>
        <div className="categories__box categories__box__2">
          <img
            src="left-bottom.png"
            alt="Product image"
            className="categories__img"
          />
          <div className="categories__content">
            <p className="categories__text">Phones</p>
            <button className="categories__btn">View &gt;</button>
          </div>
        </div>
        <div className="categories__box categories__box__3">
          <img
            src="middle.png"
            alt="Product image"
            className="categories__img"
          />
          <div className="categories__controlls">
            <button className="categories__controll categories__controll__left">
              &lt;
            </button>
            <button className="categories__controll categories__controll__right">
              &gt;
            </button>
          </div>
          <div className="dots">
            <div className="dot dot__active"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
        <div className="categories__box categories__box__4">
          <img
            src="right-top.png"
            alt="Product image"
            className="categories__img"
          />
          <div className="categories__content categories__content__right">
            <p className="categories__text">Women's shoes</p>
            <button className="categories__btn categories__btn__orange">
              View &gt;
            </button>
          </div>
        </div>
        <div className="categories__box categories__box__5">
          <img
            src="right-bottom.png"
            alt="Product image"
            className="categories__img"
          />
          <div className="categories__content categories__content__right">
            <p className="categories__text ">Accessories</p>
            <button className="categories__btn categories__btn__gray">
              View &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
