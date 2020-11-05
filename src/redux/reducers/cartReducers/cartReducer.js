import * as actionTypes from "../../actions/actionTypes";

import initialState from "../initialState";
import uuid from 'react-uuid';

export default function cartReducer(state = initialState.cart, action) {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      var addedItem = state.find(
        (c) => c.product.id === action.payload.product.frm_product_id
      );
      if (addedItem) {
        var newState = state.map((cartItem) => {
          if (cartItem.product.id === action.payload.product.frm_product_id) {
            return Object.assign({}, addedItem, {
              quantity: addedItem.quantity + 1,
            });
          }
          return cartItem;
        });
        return newState;
      } else {
        return [
          ...state,
          {
            quantity: action.payload.quantity,
            product: {
              id: action.payload.product.frm_product_id,
              name: action.payload.product.name,
              price: action.payload.product.price,
              is_menu:false,
              productDetail: {},
            },
          },
        ];
      }
    case actionTypes.REMOVE_FROM_CART:
      var itemInCart = state.find(
        (c) => c.product.id === action.payload.frm_product_id
      );
      if (itemInCart.quantity > 1) {
        var incrementedState = state.map((cartItem) => {
          if (cartItem.product.id === action.payload.frm_product_id) {
            return Object.assign({}, itemInCart, {
              quantity: itemInCart.quantity - 1,
            });
          }
          return cartItem;
        });
        return incrementedState;
      } else {
        const deletedItemState = state.filter(
          (cartItem) => cartItem.product.id !== action.payload.frm_product_id
        );
        return deletedItemState;
      }

    case actionTypes.ADD_MENU_TO_CART:
      var addedMenuItem = state.find(
        (c) => c.product.id === action.payload.product.frm_product_id
      );
      if (addedMenuItem) {
        var newMenuState = state.map((cartItem) => {
          if (cartItem.product.id === action.payload.product.frm_product_id) {
            action.payload.product.options.id = uuid();
            addedMenuItem.product.options.push(action.payload.product.options);
            return Object.assign({}, addedMenuItem, {
              quantity: addedMenuItem.quantity + 1,
            });
          }
          return cartItem;
        });
        return newMenuState;
      } else {
        action.payload.product.options.id = uuid();
        const  product = {
          id: action.payload.product.frm_product_id,
          name: action.payload.product.name,
          price: action.payload.product.price,
          is_menu:true,
          options: [],
        };
        product.options.push(action.payload.product.options);
        return [
          ...state,
          {
            quantity: action.payload.quantity,
            product,
          },
        ];
      }
    case actionTypes.REMOVE_MENU_FROM_CART:
      var menuInCart = state.find(
        (c) =>
          c.product.id === action.payload.frm_menus_id &&
          c.product.name === action.payload.name
      );
      if (menuInCart.quantity > 1) {
        var menuIncrementedState = state.map((cartItem) => {
          if (
            cartItem.product.id === action.payload.frm_menus_id &&
            cartItem.product.name === action.payload.name
          ) {
            return Object.assign({}, menuInCart, {
              quantity: menuInCart.quantity - 1,
            });
          }
          return cartItem;
        });
        return menuIncrementedState;
      } else {
        const deletedMenuItemState = state.filter(
          (cartItem) =>
            cartItem.product.id !== action.payload.frm_menus_id &&
            cartItem.product.name !== action.payload.name
        );
        return deletedMenuItemState;
      }
    default:
      return state;
  }
}
