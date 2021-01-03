import * as actionTypes from "../../actions/actionTypes";

import initialState from "../initialState";
import uuid from "react-uuid";

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
              subTotal:
                addedItem.subTotal + parseInt(action.payload.product.price),
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
              is_menu: false,
              materials: undefined,
              options: undefined,
            },
            subTotal: parseInt(action.payload.product.price),
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
              subTotal: itemInCart.subTotal - action.payload.price,
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
            const optionid = uuid();
            if (addedMenuItem.product.is_menu) {
              action.payload.product.options.id = optionid;
              addedMenuItem.product.options.push(
                action.payload.product.options
              );
            }
            let materialPrice = 0;
            if (action.payload.product.materials !== undefined) {
              materialPrice +=
                action.payload.product.materials.totalMaterialsPrice;
              action.payload.product.materials.id = uuid();
              if (action.payload.product.is_menu) {
                action.payload.product.materials.option_id = optionid;
              }
              addedMenuItem.product.materials.push(
                action.payload.product.materials
              );
            }
            addedMenuItem.product.price = action.payload.product.price;
            return Object.assign({}, addedMenuItem, {
              quantity: addedMenuItem.quantity + 1,
              subTotal:
                addedMenuItem.subTotal +
                parseInt(action.payload.product.price) +
                materialPrice,
            });
          }
          return cartItem;
        });
        return newMenuState;
      } else {
        const product = {
          id: action.payload.product.frm_product_id,
          name: action.payload.product.name,
          price: action.payload.product.price,
          is_menu: action.payload.product.is_menu,
          materials: [],
          options: [],
        };
        debugger;
        const optionid = uuid();
        if (action.payload.product.is_menu) {
          action.payload.product.options.id = optionid;
          product.options.push(action.payload.product.options);
        }
        let materialPrice = 0;
        if (action.payload.product.materials !== undefined) {
          materialPrice += parseInt(
            action.payload.product.materials.totalMaterialsPrice
          );
          action.payload.product.materials.id = uuid();
          if (action.payload.product.is_menu) {
            action.payload.product.materials.option_id = optionid;
          }
          product.materials.push(action.payload.product.materials);
        }
        return [
          ...state,
          {
            quantity: action.payload.quantity,
            subTotal: parseInt(action.payload.product.price) + materialPrice,
            product,
          },
        ];
      }
    case actionTypes.REMOVE_MENU_FROM_CART:
      var menuInCart = state.find(
        (c) => c.product.id === action.payload.productid
      );
      if (menuInCart.quantity > 1) {
        var menuDecrementedState = state.map((cartItem) => {
          let materialPrice = 0;
          if (cartItem.product.id === action.payload.productid) {
            if (action.payload.optionUniqueId !== null) {
              menuInCart.product.options = menuInCart.product.options.filter(
                (f) => f.id !== action.payload.optionUniqueId
              );
              if (Object.keys(menuInCart.product.materials).length !== 0) {
                materialPrice = parseInt(
                  menuInCart.product.materials.find(
                    (x) => x.id === action.payload.materialUniqueId
                  ).totalMaterialsPrice
                );
                menuInCart.product.materials = menuInCart.product.materials.filter(
                  (f) => f.option_id !== action.payload.optionUniqueId
                );
              }
            }

            if (
              Object.keys(menuInCart.product.materials).length !== 0 &&
              action.payload.materialUniqueId !== null
            ) {
              materialPrice = parseInt(
                menuInCart.product.materials.find(
                  (x) => x.id === action.payload.materialUniqueId
                ).totalMaterialsPrice
              );
              menuInCart.product.materials = menuInCart.product.materials.filter(
                (f) => f.id !== action.payload.materialUniqueId
              );
            }

            return Object.assign({}, menuInCart, {
              quantity: menuInCart.quantity - 1,
              subTotal:
                menuInCart.subTotal - menuInCart.product.price - materialPrice,
            });
          }
          return cartItem;
        });
        return menuDecrementedState;
      } else {
        const deletedMenuItemState = state.filter(
          (cartItem) => cartItem.product.id !== action.payload.productid
        );
        return deletedMenuItemState;
      }
    case actionTypes.REMOVE_CART:
      return action.payload;
    default:
      return state;
  }
}
