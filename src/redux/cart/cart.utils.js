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
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) =>
      cartItem.frm_product_id === cartItemToRemove.frm_product_id &&
      cartItem.options === cartItemToRemove.options &&
      cartItem.choosedMaterials === cartItemToRemove.choosedMaterials &&
      cartItem.removedMaterials === cartItemToRemove.removedMaterials
  );
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(
      (cartItem) =>
        cartItem.frm_product_id !== cartItemToRemove.frm_product_id &&
        cartItem.options === cartItemToRemove.options &&
        cartItem.choosedMaterials === cartItemToRemove.choosedMaterials &&
        cartItem.removedMaterials === cartItemToRemove.removedMaterials
    );
  }
  return cartItems.map((cartItem) =>
    cartItem.frm_product_id === cartItemToRemove.frm_product_id &&
    cartItem.options === cartItemToRemove.options &&
    cartItem.choosedMaterials === cartItemToRemove.choosedMaterials &&
    cartItem.removedMaterials === cartItemToRemove.removedMaterials
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  return cartItems.filter(
    (cartItem) =>
      cartItem.frm_product_id !== cartItemToClear.frm_product_id &&
      cartItem.options === cartItemToClear.options &&
      cartItem.choosedMaterials === cartItemToClear.choosedMaterials &&
      cartItem.removedMaterials === cartItemToClear.removedMaterials
  );
};
