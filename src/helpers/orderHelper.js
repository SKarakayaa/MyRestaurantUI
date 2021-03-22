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
  GetOrderStatusIcon: (orderStatus) => {
    switch (orderStatus) {
      case "1":
        return { icon: "tasks", class: "text-info" };
      case "2":
        return { icon: "check-circled", class: "text-success" };
      case "3":
        return { icon: "close-circled", class: "text-danger" };
      case "4":
        return { icon: "delivery-time", class: "text-danger" };
      default:
        return "";
    }
  },
};
export default OrderHelper;
