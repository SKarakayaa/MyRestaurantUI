import * as actionTypes from "../../actions/actionTypes";
import initialState from "../initialState";

export default function cartReducer(state = initialState.cart, action) {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      var addedItem = state.find(
        (c) =>
          c.product.frm_product_id === action.payload.product.frm_product_id
      );
      if (addedItem) {
        var newState = state.map((cartItem) => {
          if (
            cartItem.product.frm_product_id ===
            action.payload.product.frm_product_id
          ) {
            return Object.assign({}, addedItem, {
              quantity: addedItem.quantity + 1,
            });
          }
          return cartItem;
        });
        return newState;
      } else {
        return [...state, { ...action.payload }];
      }
    case actionTypes.REMOVE_FROM_CART:
      var itemInCart = state.find(
        (c) => c.product.frm_product_id === action.payload.frm_product_id
      );
      if (itemInCart.quantity > 1) {
        var incrementedState = state.map((cartItem) => {
          if (
            cartItem.product.frm_product_id ===
            action.payload.frm_product_id
          ) {
            return Object.assign({}, itemInCart, {
              quantity: itemInCart.quantity - 1,
            });
          }
          return cartItem;
        });
        return incrementedState;
      }else {
        const deletedItemState = state.filter(
            (cartItem) =>
              cartItem.product.frm_product_id !== action.payload.frm_product_id
          );
          return deletedItemState;
      }
      
    default:
      return state;
  }
}
