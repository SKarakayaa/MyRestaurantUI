const OrderHelper = {
  OrderValidation: (
    cartItemsCount,
    choosedAddressId,
    choosedPaymentMethodId
  ) => {
    if (cartItemsCount === 0) {
      return {
        isValid: false,
        validMessage: "Your cart is empty! You can't make order !",
      };
    }
    if (choosedAddressId === 0) {
      return {
        isValid: false,
        validMessage: "You didn't choose any address for delivery !",
      };
    }
    if (choosedPaymentMethodId === 0) {
      return {
        isValid: false,
        validMessage: "You didn't choose any payment method !",
      };
    }
    return { isValid: true };
  },
  LastOrderItemCount: (cartItems) => {
    const count = cartItems.reduce(
      (accumulator, cartItem) => (accumulator += cartItem.quantity),
      0
    );
    return count;
  },
  LastOrderTotalBill: (cartItems) => {
    const totalBill = cartItems.reduce(
      (accumulator, cartItem) =>
        (accumulator += cartItem.quantity * cartItem.price),
      0
    );
    return totalBill;
  },
};
export default OrderHelper;
