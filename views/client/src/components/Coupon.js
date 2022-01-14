import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Coupon(props) {
  const copyCode = (event) => {
    event.target.style.backgroundColor = "#ABCCEF";
    let code = event.target.textContent;
    navigator.clipboard.writeText(code);
    toast("Code copied to clipboard");
    setInterval(() => {
      event.target.style.backgroundColor = null;
    }, 500);
  };

  return (
    <div className="coupon-body">
      <ToastContainer
        autoClose={3000}
        hideProgressBar={true}
        closeOnClickrtl={true}
      />
      <p className="coupon-title" id={props.validity}>
        ₹500 off on Redmi MI Note 3
      </p>
      <hr />
      <ul>
        <li>No EMI facility available</li>
        <li>Non - refundable</li>
      </ul>
      <p className="coupon-code">
        <div id="coupon-code-header">Code :&nbsp;</div>
        <div id="coupon-code-value" onClick={copyCode}>
          AXG89MI
        </div>
      </p>
      <p className="validity">
        <strong>Valid upto : </strong>
        10<sup>th</sup> October
      </p>
    </div>
  );
}

export default Coupon;
