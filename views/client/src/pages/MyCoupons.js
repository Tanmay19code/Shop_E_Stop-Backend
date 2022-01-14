import React from "react";
import Coupon from "../components/Coupon";

function MyCoupons() {
  return (
    <div className="page-container">
      <div className="page-heading">
        <p>My Coupons</p>
        <hr />
      </div>
      <p className="coupon-header">Valid Coupons :</p>
      <div className="coupon-holder">
          <Coupon validity="valid"/>
          <Coupon validity="valid"/>
          <Coupon validity="valid"/>
          <Coupon validity="valid"/>
          <Coupon validity="valid"/>
          <Coupon validity="valid"/>
          <Coupon validity="valid"/>
          <Coupon validity="valid"/>
          <Coupon validity="valid"/>
          <Coupon validity="valid"/>
      </div>
      <p className="coupon-header">Expired Coupons :</p>
      <div className="coupon-holder">
          <Coupon validity="expired"/>
          <Coupon validity="expired"/>
          <Coupon validity="expired"/>
          <Coupon validity="expired"/>
          <Coupon validity="expired"/>
          <Coupon validity="expired"/>
          <Coupon validity="expired"/>
          <Coupon validity="expired"/>
          <Coupon validity="expired"/>
          <Coupon validity="expired"/>
      </div>
      <br/>
      <br/>
    </div>
  );
}

export default MyCoupons;
