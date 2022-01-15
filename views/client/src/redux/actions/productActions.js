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
} from "../constants/productTypes.js";
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
// const authtoken = stateObj.auth.token || undefined;

export const addProduct =
  (formData, image, highlights, specifications) => async (dispatch) => {
    const { name, description, ranking, price, category } = formData;
    const body = {
      name: name,
      description: description,
      ranking: ranking,
      price: price,
      category: category,
      highlights: highlights,
      specifications: specifications,
    };
    // const file = image;

    const config = {
      headers: {
        // "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        authtoken: authtoken,
        Authorization: `Bearer ${authtoken}`,
      },
    };
    try {
      console.log("API BODY=>", body);
      console.log("API IMAGE=>", image);
      const res = await axios.post(
        image,
        "http://localhost:5000/api/product/createproduct",
        body,
        config
      );

      dispatch({
        type: PRODUCT_ADDED_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_ADDED_FAIL,
      });
    }
  };

export const getAllProducts = () => async (dispatch) => {
  const body = {};
  const config = {
    headers: {
      "Content-Type": "application/json",
      //   authtoken: authtoken,
    },
  };
  try {
    const res = await axios.post(
      "http://localhost:5000/api/product/getallproducts",
      body,
      config
    );

    dispatch({
      type: ALL_PRODUCTS_LOADED_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_LOADED_FAIL,
    });
  }
};

export const getProduct = (productId) => async (dispatch) => {
  // console.log("ACTIONS =>", "ACtions");
  const body = {};
  const config = {
    headers: {
      "Content-Type": "application/json",
      //   authtoken: authtoken,
    },
  };
  try {
    const res = await axios.post(
      `http://localhost:5000/api/product/getproduct/${productId}`,
      body,
      config
    );

    // console.log("ACTIONS POST=>", res);

    dispatch({
      type: PRODUCT_LOADED_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log("Actions ERROR =>", error.message);
    dispatch({
      type: PRODUCT_LOADED_FAIL,
      payload: error.message,
    });
  }
};
