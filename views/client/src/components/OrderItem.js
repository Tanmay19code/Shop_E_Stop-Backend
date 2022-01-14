import React from "react";
import speaker from "../images/speaker.jpg";

function OrderItem() {
  return (
    <div className="order-list-item">
      <div className="order-list-image">
        <img src={speaker} alt="speaker" />
      </div>
      <div className="order-list-details">
        <p id="order-list-header">SONY D4 speakers</p>
        <p id="order-list-price">Paid: ₹9,000</p>
        <div className="order-delivery-status" id="delivered">
            <p>Delivered</p>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
