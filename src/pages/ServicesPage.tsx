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
                src="https://res.cloudinary.com/djrmfg6k9/image/upload/v1723659555/Process_cmd1aq.png"
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
                src="https://res.cloudinary.com/djrmfg6k9/image/upload/v1723659555/Hangar_sbn3d5.png"
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
                src="https://res.cloudinary.com/djrmfg6k9/image/upload/v1723659124/Transaction_yjiemm.png"
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
                src="https://res.cloudinary.com/djrmfg6k9/image/upload/v1723659812/Coin_in_Hand_tbnsa1.png"
                alt=""
              />
            </div>
            <p className="card-header">Transparent rates</p>
            <p>Get competitive pricing and check rates in real-time.</p>
          </div>
          <div className="cards">
            <div className="icon">
              <img
                src="https://res.cloudinary.com/djrmfg6k9/image/upload/v1723659811/Earth_Planet_yuirf3.png"
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
                src="https://res.cloudinary.com/djrmfg6k9/image/upload/v1723659811/Financial_Success_oispws.png"
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
                src="https://res.cloudinary.com/djrmfg6k9/image/upload/v1723660145/Security_Shield_qj1uzr.png"
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
                src="https://res.cloudinary.com/djrmfg6k9/image/upload/v1723660145/Web_Accessibility_jr5ecm.png"
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
                src="https://res.cloudinary.com/djrmfg6k9/image/upload/v1723660145/Customer_Support_prgt0m.png"
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
