import OrderActionTypes from "./order.types";

const INITIAL_STATE = {
  areFetchingOrderDetails: true,
  orderDetails: null,

  isFetchingUserOrderHistory: true,
  userOrderHistory: null,

  areFetchingPaymentMethods: true,
  paymentMethods: null,

  choosedAddressId: 0,
  choosedPaymentMethodId: 0,
};

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrderActionTypes.FETCH_ORDER_DETAIL_START:
      return {
        ...state,
        areFetchingOrderDetails: true,
      };
    case OrderActionTypes.FETCH_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        orderDetails: action.payload,
        areFetchingOrderDetails: false,
      };

    case OrderActionTypes.FETCH_USER_ORDER_HISTORY_START:
      return {
        ...state,
        isFetchingUserOrderHistory: true,
      };
    case OrderActionTypes.FETCH_USER_ORDER_HISTORY_SUCCESS:
      return {
        ...state,
        userOrderHistory: action.payload,
        isFetchingUserOrderHistory: true,
      };

    case OrderActionTypes.FETCH_PAYMENT_METHODS_START:
      return {
        ...state,
        areFetchingPaymentMethods: true,
      };
    case OrderActionTypes.FETCH_PAYMENT_METHODS_SUCCESS:
      return {
        ...state,
        paymentMethods: action.payload,
        areFetchingPaymentMethods: false,
      };

    case OrderActionTypes.CHOOSE_ADDRESS:
      return {
        ...state,
        choosedAddressId: action.payload,
      };
    case OrderActionTypes.CHOOSE_PAYMENT_METHOD:
      return {
        ...state,
        choosedPaymentMethodId: action.payload,
      };
    default:
      return state;
  }
};
export default orderReducer;
