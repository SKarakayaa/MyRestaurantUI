import cartReducer from "./cartReducers/cartReducer";
import categoryReducer from "./productReducers/categoryReducer";
import { combineReducers } from "redux";
import createOrderReducer from './orderReducers/createOrderReducer';
import currentUserReducer from "./userRedocers/currentUserReducer";
import customerInfoReducer from "./customerReducers/customerInfoReducer";
import customerMoreInfoReducer from "./customerReducers/customerMoreInfoReducer";
import menuOptionReducer from "./productReducers/menuOptionReducer";
import menuReducer from "./productReducers/menuReducer";
import productReducer from "./productReducers/productReducer";
import userRegisterReducer from "./userRedocers/registerUserReducer";

const rootReducer = combineReducers({
  productReducer,
  menuReducer,
  menuOptionReducer,
  customerInfoReducer,
  customerMoreInfoReducer,
  currentUserReducer,
  userRegisterReducer,
  categoryReducer,
  cartReducer,
  createOrderReducer
});

export default rootReducer;
