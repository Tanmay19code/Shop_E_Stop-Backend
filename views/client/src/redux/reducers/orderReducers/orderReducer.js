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
} from "../../constants/orderTypes.js";

const initialState = {
  cart: {},
  error: "",
//   updatedQty: 0,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADDED_TO_CART_SUCCESS:
      return state;
    case ADDED_TO_CART_FAIL:
      return state;
    case VIEW_CART_SUCCESS:
      return {
        ...state,
        cart: payload,
        error: "",
      };
    case VIEW_CART_FAIL:
      return {
        ...state,
        cart: {},
        error: payload,
      };
    case UPDATE_CART_ITEM_SUCCESS:
      return state;
    case UPDATE_CART_ITEM_FAIL:
      return state;
    case DELETE_CART_ITEM_SUCCESS:
      return state;
    case DELETE_CART_ITEM_FAIL:
      return state;
    case GET_MY_ORDERS_SUCCESS:
      return state;
    case GET_MY_ORDERS_FAIL:
      return state;
    case PLACE_ORDERS_SUCCESS:
      return state;
    case PLACE_ORDER_FAIL:
      return state;
    case CANCEL_ORDER_SUCCESS:
      return state;
    case CANCEL_ORDER_FAIL:
      return state;
    default:
      return state;
  }
}
