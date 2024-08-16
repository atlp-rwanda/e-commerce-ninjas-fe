/* eslint-disable */
import React from "react";
import { Meta } from "../components/Meta";

const ServicesPage: React.FC = () => {
  return (
    <>
      <Meta title="Services - E-Commerce Ninjas" />
      <div className="services-container">
        <div className="image-container">
          <p className="service-header">
            Welcome to e-Commerce Ninjas <br />
            Customer Services
          </p>
          <p>
            What would you like help with today? <br /> You can quickly take
            care of most things here, <br /> or connect with us when needed.
          </p>
        </div>
        <div className="services-cards">
          <div className="cards">
            <div className="icon">
              <img
                src="https://res.cloudinary.com/djrmfg6k9/image/upload/v1723834911/Process_1_uqwerq.png"
                alt=""
              />
            </div>
            <p className="card-header">Simplified process</p>
            <p>
              e-Commerce-Ninjas.com reviews your claim directly, saving you time
              spent negotiating with suppliers*.
            </p>
          </div>
          <div className="cards">
            <div className="icon">
              <img
                src="https://res.cloudinary.com/djrmfg6k9/image/upload/v1723834911/Hangar_1_tzoydr.png"
                alt=""
              />
            </div>
            <p className="card-header">Inventory management</p>
            <p>
              Better plan out and manage inventory knowing orders will be
              delivered on time.
            </p>
          </div>
          <div className="cards">
            <div className="icon">
              <img
                src="https://res.cloudinary.com/djrmfg6k9/image/upload/v1723834911/Transaction_1_mkwskd.png"
                alt=""
              />
            </div>
            <p className="card-header">Compensation for delays</p>
            <p>
              If late delivery occurs, receive a coupon which can be used for
              future purchases.
            </p>
          </div>
          <div className="cards">
            <div className="icon">
              <img
                src="https://res.cloudinary.com/djrmfg6k9/image/upload/v1723834910/Coin_in_Hand_1_gno7gh.png"
                alt=""
              />
            </div>
            <p className="card-header">Transparent rates</p>
            <p>Get competitive pricing and check rates in real-time.</p>
          </div>
          <div className="cards">
            <div className="icon">
              <img
                src="https://res.cloudinary.com/djrmfg6k9/image/upload/v1723834910/Earth_Planet_1_uzxsfr.png"
                alt=""
              />
            </div>
            <p className="card-header">Worldwide coverage</p>
            <p>
              Enjoy tracked delivery to most countries and regions around the
              world.
            </p>
          </div>
          <div className="cards">
            <div className="icon">
              <img
                src="https://res.cloudinary.com/djrmfg6k9/image/upload/v1723834910/Financial_Success_1_qb4kuu.png"
                alt=""
              />
            </div>
            <p className="card-header">Tailored solutions</p>
            <p>
              Choose from door-to-door and port- to-port services according to
              your needs and budget.
            </p>
          </div>
          <div className="cards">
            <div className="icon">
              <img
                src="https://res.cloudinary.com/djrmfg6k9/image/upload/v1723834910/Security_Shield_1_gxwapg.png"
                alt=""
              />
            </div>
            <p className="card-header">Security & Privacy</p>
            <p>
              e-Commerce-Ninjas.com reviews your claim directly, saving you time
              spent negotiating with suppliers*.
            </p>
          </div>
          <div className="cards">
            <div className="icon">
              <img
                src="https://res.cloudinary.com/djrmfg6k9/image/upload/v1723834910/Web_Accessibility_1_n8fof9.png"
                alt=""
              />
            </div>
            <p className="card-header">Accessibility</p>
            <p>
              Better plan out and manage inventory knowing orders will be
              delivered on time.
            </p>
          </div>
          <div className="cards">
            <div className="icon">
              <img
                src="https://res.cloudinary.com/djrmfg6k9/image/upload/v1723834910/Customer_Support_1_gott5j.png"
                alt=""
              />
            </div>
            <p className="card-header">Resolution support</p>
            <p>
              If there's a problem with your refund, we will help mediate to get
              your money back.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
