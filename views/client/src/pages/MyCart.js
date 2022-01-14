import React, { useState, useEffect } from "react";
import CartItem from "../components/CartItem";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCart, placeOrder } from "../redux/actions/orderActions.js";
import speaker from "../images/laptop1.jpg";

const MyCart = () => {
  const [cart, setCart] = useState({});
  // const [totalPrice, setTotalPrice] = useState(0);
  let totalPrice = 0;
  // let priceArray = [];
  // const [display, setDisplay] = useState(true)
  let auxPrice = 0;
  let state;
  const dispatch = useDispatch(null);
  state = JSON.parse(localStorage.getItem("state"));
  let user = state.auth.userDetail;
  useEffect(() => {
    dispatch(getCart())
      .then(() => {
        setCart(state.order.cart);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  const placeOrderFunction = () => {
    dispatch(placeOrder(cart.orderedBy.primaryAddress))
      .then(() => {
        alert("Order placed succefully!");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  console.log("CART=>", cart);
  // if (!cart.cartItems) {
  //   // alert("Please select")
  //   // cart.cartItems = null;
  //   setDisplay(false);
  // }

  return (
    <div className="page-container">
      <div className="page-heading">
        <p>My Cart</p>
        <hr />
      </div>

      {/* <div className="empty-cart">
        <p>Your Cart is Empty</p>
        <Link to="/">
          <input type="button" value="Continue Shopping" />
        </Link>
      </div> */}

      {user && user.name ? (
        <div>
          {cart.cartItems ? (
            <>
              {console.log("CART ITEMS =>", cart.cartItems)}
              {cart.cartItems && (
                <div className="cart-products-holder cart-item-holder">
                  {cart?.cartItems.map((item, index) => {
                    return (
                      <CartItem
                        key={index}
                        name={item.productId.name}
                        image={item.productId.image}
                        // image={speaker}
                        cartItemId={item._id}
                        qty={item.productQty}
                        price={item.productId.price}
                      />
                    );
                  })}
                </div>
              )}
              <div className="cart-payment-distribution">
                <div className="cart-products-holder " id="cart-payment">
                  <p id="payment-distribution-heading">Payment Distribution</p>
                  {cart.cartItems && (
                    <div className="payment-container">
                      {cart?.cartItems.map((item, index) => {
                        // priceArray.push(item.productQty * item.productId.price);
                        totalPrice = totalPrice + item.productQty * item.productId.price;
                        return (
                          <div key={index} className="payment-item">
                            <div id="payment-name">
                              <p>{item.productId.name}</p>
                            </div>
                            <div id="payment-price">
                              {/* {() => {
                                setTotalPrice(item.productQty * item.productId.price); */}
                              {/* {console.log("price x qty",item.productQty * item.productId.price)} */}
                              
                              {/* }} */}
                              {/* {() => { totalPrice = totalPrice + item.productQty * item.productId.price }} */}
                              {/* {() => {
                            auxPrice =
                              totalPrice +
                              item.productQty * item.productId.price;
                            setTotalPrice(auxPrice);
                          }} */}

                              <p>{`${item.productQty} x ₹${item.productId.price}`}</p>
                            </div>
                          </div>
                        );
                      })}
                      {/* {console.log("priceArray=>",priceArray)} */}
                      {/***********************/}
                      <div className="payment-item">
                        <div id="payment-name">
                          <p>Total Amount:</p>
                        </div>
                        <div id="payment-price">
                          <p>{`₹${totalPrice}`}</p>
                        </div>
                      </div>
                      <div className="payment-item">
                        <div id="payment-name">
                          <p>Delivery Charges</p>
                        </div>
                        <div id="payment-price">
                          <p>₹100</p>
                        </div>
                      </div>
                      <div className="payment-item">
                        <div id="payment-name" className="payment-grand-total">
                          <p>GRAND TOTAL</p>
                        </div>
                        <div id="payment-price" className="payment-grand-total">
                          <p>₹36,100</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="cart-products-holder " id="cart-payment">
                  <div className="cart-delivery-container">
                    <div className="cart-delivery-location-logo">
                      <IoLocationOutline className="location-logo" />
                    </div>
                    <div className="cart-delivery-location-holder">
                      <p id="cart-delivery-location-type">Home ▼</p>
                      <hr />
                      <p id="cart-delivery-location-address">
                        {/* A3/105, Suryamukhi bldg, LokSurabhi, Near Patri Pool,Kalyan
                    (W) - 421301 */}
                        {cart.orderedBy.primaryAddress}
                      </p>
                    </div>
                  </div>
                  <div className="cart-delivery-container">
                    <button className="cart-button1">
                      <Link to="/"> Explore</Link>
                    </button>

                    <button
                      className="cart-button2"
                      onClick={placeOrderFunction}
                    >
                      Proceed ✓
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="empty-cart">
              <p>Your Cart is Empty</p>
              <Link to="/">
                <input type="button" value="Continue Shopping" />
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="empty-cart">
        <p>Please, Login to view your cart!!</p>
        <Link to="/login">
          <input type="button" value="LOGIN" />
        </Link>
      </div>
      )}
    </div>
  );
};

export default MyCart;
