import * as actionTypes from "./actionTypes";

export function addToCart(cartItem) {
  return { type: actionTypes.ADD_TO_CART, payload: cartItem };
}

export function removeFromCart(product) {
  return { type: actionTypes.REMOVE_FROM_CART, payload: product };
}

export function addMenuToCart(cartItem) {
  return { type: actionTypes.ADD_MENU_TO_CART, payload: cartItem };
}

export function removeCart() {
  return { type: actionTypes.REMOVE_CART, payload: [] };
}

export function removeMenuFromCart(
  productid,
  optionUniqueId,
  materialUniqueId
) {
  return {
    type: actionTypes.REMOVE_MENU_FROM_CART,
    payload: { optionUniqueId, productid, materialUniqueId },
  };
}
