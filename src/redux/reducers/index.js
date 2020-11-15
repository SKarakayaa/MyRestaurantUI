import addressReducer from './addressReducers/addressReducer';
import cartReducer from "./cartReducers/cartReducer";
import categoryReducer from "./productReducers/categoryReducer";
import { combineReducers } from "redux";
import createOrderReducer from './orderReducers/createOrderReducer';
import currentUserReducer from "./userRedocers/currentUserReducer";
import customerInfoReducer from "./customerReducers/customerInfoReducer";
import customerMoreInfoReducer from "./customerReducers/customerMoreInfoReducer";
import favoriteProductReducer from './userRedocers/favoriteProductReducer';
import menuOptionReducer from "./productReducers/menuOptionReducer";
import menuReducer from "./productReducers/menuReducer";
import productReducer from "./productReducers/productReducer";
import userRegisterReducer from "./userRedocers/registerUserReducer";
import materialReducer from './productReducers/materialReducer';

const rootReducer = combineReducers({
  favoriteProductReducer,
  materialReducer,
  productReducer,
  menuReducer,
  menuOptionReducer,
  customerInfoReducer,
  customerMoreInfoReducer,
  currentUserReducer,
  userRegisterReducer,
  categoryReducer,
  cartReducer,
  createOrderReducer,
  addressReducer
});

export default rootReducer;
