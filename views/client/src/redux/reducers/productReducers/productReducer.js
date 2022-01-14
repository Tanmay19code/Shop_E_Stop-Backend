import {
  PRODUCT_ADDED_SUCCESS,
  PRODUCT_ADDED_FAIL,
  PRODUCT_LOADED_SUCCESS,
  PRODUCT_LOADED_FAIL,
  ALL_PRODUCTS_LOADED_SUCCESS,
  ALL_PRODUCTS_LOADED_FAIL,
  MY_PRODUCTS_LOADED_SUCCESS,
  MY_PRODUCTS_LOADED_FAIL,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
} from "../../constants/productTypes";

const initialState = {
  // loading: false,
  addedProduct: {},
  fetchedProduct: {},
  products: [],
  error: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_ADDED_SUCCESS:
      return {
        ...state,
        addedProduct: payload,
        error: "",
      };
    case PRODUCT_ADDED_FAIL:
      return state;
    case PRODUCT_LOADED_SUCCESS:
      return {
        ...state,
        fetchedProduct: payload,
        error: "",
      };
    case PRODUCT_LOADED_FAIL:
      return state;
    case ALL_PRODUCTS_LOADED_SUCCESS:
      return {
        ...state,
        // loading: false,
        products: payload,
        error: "",
      };
    case ALL_PRODUCTS_LOADED_FAIL:
      return {
        ...state,
        error: payload,
      };
    case MY_PRODUCTS_LOADED_SUCCESS:
      return state;
    case MY_PRODUCTS_LOADED_FAIL:
      return state;
    case UPDATE_PRODUCT_SUCCESS:
      return state;
    case UPDATE_PRODUCT_FAIL:
      return state;
    case DELETE_PRODUCT_SUCCESS:
      return state;
    case DELETE_PRODUCT_FAIL:
      return state;
    default:
      return state;
  }
}
