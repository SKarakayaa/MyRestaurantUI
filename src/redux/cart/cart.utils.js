import uuid from "react-uuid";

export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) =>
      cartItem.frm_product_id === cartItemToAdd.frm_product_id &&
      cartItem.options === cartItemToAdd.options &&
      cartItem.choosedMaterials === cartItemToAdd.choosedMaterials &&
      cartItem.removedMaterials === cartItemToAdd.removedMaterials
  );
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.frm_product_id === cartItemToAdd.frm_product_id &&
      cartItem.options === cartItemToAdd.options &&
      cartItem.choosedMaterials === cartItemToAdd.choosedMaterials &&
      cartItem.removedMaterials === cartItemToAdd.removedMaterials
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...cartItemToAdd, quantity: 1, id: uuid() }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};
