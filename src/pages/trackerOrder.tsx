/* eslint-disable */
import React from "react";
const TrackerOrder = () => {
  return (
    <div className="order-details-container">
      <div className="order-details">
        <h2>Order Details</h2>
        <p>
          <strong>ORDER ID:</strong> 7001860211
        </p>

        <div>
          <p>Your order was delivered on June 22, 2024</p>
          <p>
            <strong>Shipping Address:</strong> Musanze, Byangabo
          </p>
          <div className="description">
            <p>
              <strong>
                Total
                <br />
                <br />
              </strong>
              <b>800,000 Rwf</b>
            </p>

            <p>
              <strong>
                Tracking Number
                <br />
                <br />
              </strong>
              <b>1Z999AA12345678</b>
            </p>
          </div>
        </div>
        
        <img src="https://res.cloudinary.com/djrmfg6k9/image/upload/v1720293466/i4fufpae6uxecwipwhy7.jpg" alt="Product" />
       
        <p>Flat TV</p>
      </div>

      <div className="delivery-timeline">
        <div className="heading">
        <h3>Delivery Timeline</h3>
        </div>
        <ul>
          <li>
            <div className="circle"></div>
            <div>
              <p>Order Placed</p>
              <span>June 21, 2024 - 11:55 p.m</span>
            </div>
          </li>
          <li>
            <div className="circle"></div>
            <div>
              <p>Shipped</p>
              <span>June 22, 2024 - 8:55 a.m</span>
            </div>
          </li>
          <li>
            <div className="circle"></div>
            <div>
              <p>Delivered</p>
              <span>June 22, 2024 - 10:25 a.m</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TrackerOrder;
