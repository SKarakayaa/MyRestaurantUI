import addressReducer from "./address/address.reducer";
import authReducer from "./auth/auth.reducer";
import cartReducer from "./cart/cart.reducer";
import categoryReducer from "./category/category.reducer";
import { combineReducers } from "redux";
import commentReducer from "./comment/comment.reducer";
import customerReducer from "./customer/customer.reducer";
import likeReducer from "./like/like.reducer";
import mainReducer from "./main/main.reducer";
import orderReducer from "./order/order.reducer";
import productReducer from "./product/product.reducer";
import userReducer from "./user/user.reducer";

const rootReducer = combineReducers({
  customer: customerReducer,
  categories: categoryReducer,
  products: productReducer,
  cart: cartReducer,
  comments: commentReducer,
  auth: authReducer,
  user: userReducer,
  order: orderReducer,
  address: addressReducer,
  like: likeReducer,
  main: mainReducer,
});
export default rootReducer;
