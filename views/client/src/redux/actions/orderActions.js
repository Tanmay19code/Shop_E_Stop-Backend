import {
  ADDED_TO_CART_SUCCESS,
  ADDED_TO_CART_FAIL,
  VIEW_CART_SUCCESS,
  VIEW_CART_FAIL,
  UPDATE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAIL,
  DELETE_CART_ITEM_SUCCESS,
  DELETE_CART_ITEM_FAIL,
  GET_MY_ORDERS_SUCCESS,
  GET_MY_ORDERS_FAIL,
  PLACE_ORDERS_SUCCESS,
  PLACE_ORDER_FAIL,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAIL,
} from "../constants/orderTypes.js";
import axios from "axios";

const state = localStorage.getItem("state");
const stateObj = JSON.parse(state);

let authtoken;
// const authtoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjNDViODhjMTZhYmFkOWUyNmExMmIwIn0sImlhdCI6MTY0MTU3NzI0NH0.d9jZycUi8GkPwizo3Qepf4jadxIItPOmRz9qBY8NtKs"
if (stateObj) {
  authtoken = stateObj.auth.token;
} else {
  authtoken = undefined;
}

export const getCart = () => async (dispatch) => {
  const body = {};
  const config = {
    headers: {
      "Content-Type": "application/json",
      authtoken: authtoken,
    },
  };
  try {
    // console.log("Order token=>", authtoken);
    const res = await axios.post(
      "http://localhost:5000/api/order/getcart",
      body,
      config
    );
    dispatch({
      type: VIEW_CART_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: VIEW_CART_FAIL,
      payload: error.message,
    });
  }
};

export const updateCartItem = (cartItemId, newQty) => async (dispatch) => {
  const body = {
    productQty: newQty,
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
      authtoken: authtoken,
    },
  };
  try {
    // console.log("Order token=>", authtoken);
    const res = await axios.put(
      `http://localhost:5000/api/order/update-cart-item/${cartItemId}`,
      body,
      config
    );
    dispatch({
      type: UPDATE_CART_ITEM_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CART_ITEM_FAIL,
      payload: error.message,
    });
  }
};

export const deleteCartItem = (cartItemId) => async (dispatch) => {
  const body = {};
  const config = {
    headers: {
      "Content-Type": "application/json",
      authtoken: authtoken,
    },
  };
  try {
    // console.log("Order token=>", authtoken);
    const res = await axios.post(
      `http://localhost:5000/api/order/delete-cart-item/${cartItemId}`,
      body,
      config
    );
    dispatch({
      type: DELETE_CART_ITEM_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CART_ITEM_FAIL,
      payload: error.message,
    });
  }
};

export const placeOrder = (address) => async (dispatch) => {
  const body = {
    address: address,
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
      authtoken: authtoken,
    },
  };
  try {
    // console.log("Order token=>", authtoken);
    const res = await axios.post(
      `http://localhost:5000/api/order/place-order`,
      body,
      config
    );
    dispatch({
      type: PLACE_ORDERS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PLACE_ORDER_FAIL,
      payload: error.message,
    });
  }
};

export const addToCart = (productId) => async (dispatch) => {
  const body = {
    orderItems: [
      {
        productId: productId,
        productQty: 1,
      },
    ],
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
      authtoken: authtoken,
    },
  };
  try {
    // console.log("Order token=>", authtoken);
    const res = await axios.post(
      `http://localhost:5000/api/order/add-cart-items`,
      body,
      config
    );
    dispatch({
      type: ADDED_TO_CART_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ADDED_TO_CART_FAIL,
      payload: error.message,
    });
  }
};

export const getMyOrders = () => async (dispatch) => {
  const body = {};
  const config = {
    headers: {
      "Content-Type": "application/json",
      authtoken: authtoken,
    },
  };
  try {
    // console.log("Order token=>", authtoken);
    const res = await axios.post(
      `http://localhost:5000/api/order/my-orders`,
      body,
      config
    );
    dispatch({
      type: GET_MY_ORDERS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_MY_ORDERS_FAIL,
      payload: error.message,
    });
  }
};
