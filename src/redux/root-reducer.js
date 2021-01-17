import cartReducer from "./cart/cart.reducer";
import categoryReducer from "./category/category.reducer";
import { combineReducers } from "redux";
import commentReducer from "./comment/comment.reducer";
import customerReducer from "./customer/customer.reducer";
import productReducer from "./product/product.reducer";

const rootReducer = combineReducers({
  customer: customerReducer,
  categories: categoryReducer,
  products: productReducer,
  cart: cartReducer,
  comments: commentReducer,
});
export default rootReducer;
