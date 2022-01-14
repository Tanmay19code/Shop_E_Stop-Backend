import React, { useState } from "react";
import speaker from "../images/speaker.jpg";
import { MdDelete } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  updateCartItem,
  deleteCartItem,
} from "../redux/actions/orderActions.js";

const CartItem = (props) => {
  const [image, setImage] = useState("initialState")
  const dispatch = useDispatch(null);
  // const navigate = useNavigate();

  const [items, setItems] = useState(props.qty);
  // let disabled = props.disabled;
  const decreaseCount = () => {
    if (items > 1) {
      // setItems(items - 1);
      dispatch(updateCartItem(props.cartItemId, items - 1)).then(() => {
        setTimeout(() => {
          window.location.reload(false);
        }, 3);
      });
    }
    // else {

    // }
  };

  const increaseCount = () => {
    if (items < 5) {
      // setItems(items + 1);
      dispatch(updateCartItem(props.cartItemId, items + 1)).then(() => {
        setTimeout(() => {
          window.location.reload(false);
        }, 3);
      });
    } else {
      alert(
        "You can buy maximum 5 pieces at a time.\nFor more info, contact shop.e.stop@gmail.com "
      );
    }
  };

  const deleteItem = () => {
    dispatch(deleteCartItem(props.cartItemId)).then(() => {
      setTimeout(() => {
        window.location.reload(false);
      }, 3);
    });
  }

  
    try {
      if (props && props.image) {
        import(`../backendimages/${props.image}`).then((img) => {
          setImage(img.default);
          // console.log("IMAGE=>", image);
        });
      }
    } catch (err) {
      setImage("");
    }

  return (
    <div>
      <div className="cart-item">
        <div className="cart-item-image">
          <img src={image} alt={props.name} />
        </div>
        <div className="cart-item-details">
          <div id="cart-item-heading">{props.name}</div>
          <div id="cart-item-price">₹{props.price}</div>
          <div className="cart-item-qty">
            <p>Qty: </p>
            <div id="cart-item-qty-holder">
              <div
                onClick={decreaseCount}
                className="cart-item-qty-contents"
                id="cart-item-qty-btn1"
              >
                <p>-</p>
              </div>
              <div
                className="cart-item-qty-contents"
                id="cart-item-qty-display"
              >
                <p>{items}</p>
              </div>
              <div
                onClick={increaseCount}
                className="cart-item-qty-contents"
                id="cart-item-qty-btn2"
              >
                <p>+</p>
              </div>
            </div>
            <div className="cart-delete-logo" onClick={deleteItem}>
              <MdDelete />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CartItem.defaultProps = {
  disabled: false,
};

export default CartItem;
