import addressReducer from "./addressReducers/addressReducer";
import cartReducer from "./cartReducers/cartReducer";
import categoryReducer from "./productReducers/categoryReducer";
import { combineReducers } from "redux";
import createOrderReducer from "./orderReducers/createOrderReducer";
import currentUserReducer from "./userRedocers/currentUserReducer";
import customerCommentLikeReducer from "./customerCommentLikeReducer/cutomerCommentLikeReducer";
import customerCommentReducer from "./customersCommentReducers/customerCommentReducer";
import customerCuisineReducer from "./customerReducers/customerCuisineReducer";
import customerGaleryReducer from "./customerReducers/customerGaleryReducer";
import customerInfoReducer from "./customerReducers/customerInfoReducer";
import customerMoreInfoReducer from "./customerReducers/customerMoreInfoReducer";
import customerSliderReducer from "./customerReducers/customerSliderReducer";
import favoriteProductReducer from "./userRedocers/favoriteProductReducer";
import materialReducer from "./productReducers/materialReducer";
import menuOptionReducer from "./productReducers/menuOptionReducer";
import menuReducer from "./productReducers/menuReducer";
import orderDetailReducer from "./orderReducers/orderDetailReducer";
import orderReducer from "./orderReducers/orderReducer";
import productReducer from "./productReducers/productReducer";
import userInfoReducer from "./userRedocers/userInfoReducer";
import userInfoUpdateReducer from "./userRedocers/userInfoUpdateReducer";
import userRegisterReducer from "./userRedocers/registerUserReducer";

const rootReducer = combineReducers({
  materialReducer,
  productReducer,
  menuReducer,
  menuOptionReducer,

  customerInfoReducer,
  customerMoreInfoReducer,
  customerSliderReducer,
  customerCommentReducer,
  customerGaleryReducer,
  customerCuisineReducer,

  customerCommentLikeReducer,

  currentUserReducer,
  userRegisterReducer,
  userInfoReducer,
  userInfoUpdateReducer,
  favoriteProductReducer,
  addressReducer,

  categoryReducer,

  cartReducer,

  createOrderReducer,
  orderDetailReducer,
  orderReducer,
});

export default rootReducer;
