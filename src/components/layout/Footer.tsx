/* eslint-disable */

import React from "react";
import "../../styles/Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__left">
            <nav className="footer__nav">
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
            <nav className="footer__nav">
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
            <nav className="footer__nav">
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
                    href="mailto:ecommerceninjas@gmail.com"
                    className="footer__link"
                  >
                    ecommerceninjas@gmail.com
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              className="footer__icon"
            >
              <g fill="none">
                <rect
                  width={256}
                  height={256}
                  fill="url(#skillIconsInstagram0)"
                  rx={60}
                ></rect>
                <rect
                  width={256}
                  height={256}
                  fill="url(#skillIconsInstagram1)"
                  rx={60}
                ></rect>
                <path
                  fill="#fff"
                  d="M128.009 28c-27.158 0-30.567.119-41.233.604c-10.646.488-17.913 2.173-24.271 4.646c-6.578 2.554-12.157 5.971-17.715 11.531c-5.563 5.559-8.98 11.138-11.542 17.713c-2.48 6.36-4.167 13.63-4.646 24.271c-.477 10.667-.602 14.077-.602 41.236s.12 30.557.604 41.223c.49 10.646 2.175 17.913 4.646 24.271c2.556 6.578 5.973 12.157 11.533 17.715c5.557 5.563 11.136 8.988 17.709 11.542c6.363 2.473 13.631 4.158 24.275 4.646c10.667.485 14.073.604 41.23.604c27.161 0 30.559-.119 41.225-.604c10.646-.488 17.921-2.173 24.284-4.646c6.575-2.554 12.146-5.979 17.702-11.542c5.563-5.558 8.979-11.137 11.542-17.712c2.458-6.361 4.146-13.63 4.646-24.272c.479-10.666.604-14.066.604-41.225s-.125-30.567-.604-41.234c-.5-10.646-2.188-17.912-4.646-24.27c-2.563-6.578-5.979-12.157-11.542-17.716c-5.562-5.562-11.125-8.979-17.708-11.53c-6.375-2.474-13.646-4.16-24.292-4.647c-10.667-.485-14.063-.604-41.23-.604zm-8.971 18.021c2.663-.004 5.634 0 8.971 0c26.701 0 29.865.096 40.409.575c9.75.446 15.042 2.075 18.567 3.444c4.667 1.812 7.994 3.979 11.492 7.48c3.5 3.5 5.666 6.833 7.483 11.5c1.369 3.52 3 8.812 3.444 18.562c.479 10.542.583 13.708.583 40.396c0 26.688-.104 29.855-.583 40.396c-.446 9.75-2.075 15.042-3.444 18.563c-1.812 4.667-3.983 7.99-7.483 11.488c-3.5 3.5-6.823 5.666-11.492 7.479c-3.521 1.375-8.817 3-18.567 3.446c-10.542.479-13.708.583-40.409.583c-26.702 0-29.867-.104-40.408-.583c-9.75-.45-15.042-2.079-18.57-3.448c-4.666-1.813-8-3.979-11.5-7.479s-5.666-6.825-7.483-11.494c-1.369-3.521-3-8.813-3.444-18.563c-.479-10.542-.575-13.708-.575-40.413c0-26.704.096-29.854.575-40.396c.446-9.75 2.075-15.042 3.444-18.567c1.813-4.667 3.983-8 7.484-11.5c3.5-3.5 6.833-5.667 11.5-7.483c3.525-1.375 8.819-3 18.569-3.448c9.225-.417 12.8-.542 31.437-.563zm62.351 16.604c-6.625 0-12 5.37-12 11.996c0 6.625 5.375 12 12 12s12-5.375 12-12s-5.375-12-12-12zm-53.38 14.021c-28.36 0-51.354 22.994-51.354 51.355c0 28.361 22.994 51.344 51.354 51.344c28.361 0 51.347-22.983 51.347-51.344c0-28.36-22.988-51.355-51.349-51.355zm0 18.021c18.409 0 33.334 14.923 33.334 33.334c0 18.409-14.925 33.334-33.334 33.334c-18.41 0-33.333-14.925-33.333-33.334c0-18.411 14.923-33.334 33.333-33.334"
                ></path>
                <defs>
                  <radialGradient
                    id="skillIconsInstagram0"
                    cx={0}
                    cy={0}
                    r={1}
                    gradientTransform="matrix(0 -253.715 235.975 0 68 275.717)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#fd5"></stop>
                    <stop offset={0.1} stopColor="#fd5"></stop>
                    <stop offset={0.5} stopColor="#ff543e"></stop>
                    <stop offset={1} stopColor="#c837ab"></stop>
                  </radialGradient>
                  <radialGradient
                    id="skillIconsInstagram1"
                    cx={0}
                    cy={0}
                    r={1}
                    gradientTransform="matrix(22.25952 111.2061 -458.39518 91.75449 -42.881 18.441)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#3771c8"></stop>
                    <stop offset={0.128} stopColor="#3771c8"></stop>
                    <stop offset={1} stopColor="#60f" stopOpacity={0}></stop>
                  </radialGradient>
                </defs>
              </g>
            </svg>
          </a>
          <a
            href="https://facebook.com"
            className="footer__socials__link"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 128 128"
              className="footer__icon"
            >
              <rect
                width={118.35}
                height={118.35}
                x={4.83}
                y={4.83}
                fill="#3d5a98"
                rx={6.53}
                ry={6.53}
              ></rect>
              <path
                fill="#fff"
                d="M86.48 123.17V77.34h15.38l2.3-17.86H86.48v-11.4c0-5.17 1.44-8.7 8.85-8.7h9.46v-16A127 127 0 0 0 91 22.7c-13.62 0-23 8.3-23 23.61v13.17H52.62v17.86H68v45.83z"
              ></path>
            </svg>
          </a>
          <a
            href="https://x.com"
            className="footer__socials__link"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              className="footer__icon"
            >
              <g fill="none">
                <rect width={256} height={256} fill="#fff" rx={60}></rect>
                <rect width={256} height={256} fill="#1d9bf0" rx={60}></rect>
                <path
                  fill="#fff"
                  d="M199.572 91.411c.11 1.587.11 3.174.11 4.776c0 48.797-37.148 105.075-105.075 105.075v-.03A104.54 104.54 0 0 1 38 184.677c2.918.351 5.85.526 8.79.533a74.154 74.154 0 0 0 45.865-15.839a36.976 36.976 0 0 1-34.501-25.645a36.811 36.811 0 0 0 16.672-.636c-17.228-3.481-29.623-18.618-29.623-36.198v-.468a36.705 36.705 0 0 0 16.76 4.622c-16.226-10.845-21.228-32.432-11.43-49.31a104.814 104.814 0 0 0 76.111 38.582a36.95 36.95 0 0 1 10.683-35.283c14.874-13.982 38.267-13.265 52.249 1.601a74.105 74.105 0 0 0 23.451-8.965a37.061 37.061 0 0 1-16.234 20.424A73.446 73.446 0 0 0 218 72.282a75.023 75.023 0 0 1-18.428 19.13"
                ></path>
              </g>
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            className="footer__socials__link"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              className="footer__icon"
            >
              <path
                fill="#0a66c2"
                d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4c-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.91 39.91 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186zM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009s9.851-22.014 22.008-22.016c12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97zM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"
              ></path>
            </svg>
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
