/* eslint-disable */

import React from "react";
import { FaInstagramSquare } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__left">
            <nav className="footer__nav footer__nav__first">
              <p className="footer__title">Get support</p>
              <ul className="footer__list">
                <li className="footer__item">
                  <a href="#" className="footer__link">
                    Help center
                  </a>
                </li>
                <li className="footer__item">
                  <a href="#" className="footer__link">
                    Live chat
                  </a>
                </li>
                <li className="footer__item">
                  <a href="#" className="footer__link">
                    Report abuse
                  </a>
                </li>
                <li className="footer__item">
                  <a href="#" className="footer__link">
                    Frequently Asked Questions
                  </a>
                </li>
              </ul>
            </nav>
            <nav className="footer__nav">
              <p className="footer__title">Trade assurance</p>
              <ul className="footer__list">
                <li className="footer__item">
                  <a href="#" className="footer__link">
                    Safety and easy payment
                  </a>
                </li>
                <li className="footer__item">
                  <a href="#" className="footer__link">
                    On-time shipping
                  </a>
                </li>
                <li className="footer__item">
                  <a href="#" className="footer__link">
                    After-sales protection
                  </a>
                </li>
                <li className="footer__item">
                  <a href="#" className="footer__link">
                    Money-back policy
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="footer__right">
            <nav className="footer__nav footer__nav__second__last">
              <p className="footer__title">Shopping guides</p>
              <ul className="footer__list">
                <li className="footer__item">
                  <a href="#" className="footer__link">
                    How to register
                  </a>
                </li>
                <li className="footer__item">
                  <a href="#" className="footer__link">
                    How to place an order
                  </a>
                </li>
                <li className="footer__item">
                  <a href="#" className="footer__link">
                    How to pay
                  </a>
                </li>
                <li className="footer__item">
                  <a href="#" className="footer__link">
                    Frequently Asked Questions
                  </a>
                </li>
              </ul>
            </nav>
            <nav className="footer__nav footer__nav__last">
              <p className="footer__title">Get to know us</p>
              <ul className="footer__list">
                <li className="footer__special__item">
                  <span className="footer__text">Address:</span>
                  <address className="footer__address">
                    Kigali, Rwanda,
                    <br />
                    Norsken Building,
                    <br />
                    Room 14 Second floor
                  </address>
                  <span className="footer__text">Phone:</span>
                  <a href="tel:+250783456766" className="footer__link">
                    +250783456766
                  </a>
                  <span className="footer__text">Email:</span>
                  <a
                    href="mailto:ecommerceninjas45@gmail.com"
                    className="footer__link"
                  >
                    ecommerceninjas45@gmail.com
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="footer__socials">
          <a
            href="https://instagram.com"
            className="footer__socials__link"
            target="_blank"
          >
            <FaInstagramSquare className="footer__icon" />
          </a>

          <a
            href="https://facebook.com"
            className="footer__socials__link"
            target="_blank"
          >
            <IoLogoFacebook className="footer__icon" />
          </a>
          <a
            href="https://x.com"
            className="footer__socials__link"
            target="_blank"
          >
            <FaSquareTwitter className="footer__icon" />
          </a>
          <a
            href="https://linkedin.com"
            className="footer__socials__link"
            target="_blank"
          >
            <FaLinkedin className="footer__icon" />
          </a>
        </div>
      </div>
      <div className="footer__additional">
        <ul className="footer__additional__list">
          <li className="footer__additional__item">
            <a href="#" className="footer__additional__link">
              Terms of use
            </a>
          </li>
          <li className="footer__additional__item">
            <a href="#" className="footer__additional__link">
              Legal notice
            </a>
          </li>
          <li className="footer__additional__item">
            <a href="#" className="footer__additional__link">
              Product Listing Policy
            </a>
          </li>
          <li className="footer__additional__item">
            <a href="#" className="footer__additional__link">
              Privacy Policy
            </a>
          </li>
        </ul>
        <p className="footer__copyright">
          &copy; E-commerce Ninjas {new Date().getFullYear()}. All rights
          reserved
        </p>
      </div>
    </footer>
  );
}
export default Footer;