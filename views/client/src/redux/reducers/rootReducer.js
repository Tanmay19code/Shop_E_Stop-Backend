import { combineReducers } from "redux";
import authReducer from "./authReducers/authReducer";
import productReducer from "./productReducers/productReducer";
import orderReducer from "./orderReducers/orderReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  order: orderReducer,
});

export default rootReducer;
