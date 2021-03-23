import OrderActionTypes from "./order.types";

const INITIAL_STATE = {
  areFetchingOrderDetails: true,
  orderDetails: null,

  isFetchingUserOrderHistory: true,
  userOrderHistory: null,

  areFetchingPaymentMethods: true,
  paymentMethods: null,

  choosedAddress: null,
  choosedPaymentMethodId: 0,

  isOrderCreated: false,
  lastOrder: null,
  orderErrorMessage: null,
};

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrderActionTypes.RESET_ORDERS:
      return {
        ...state,
        userOrderHistory: null,
        isFetchingUserOrderHistory: true,

        areFetchingOrderDetails: true,
        orderDetails: null,
      };
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
        choosedAddress: action.payload,
      };
    case OrderActionTypes.CHOOSE_PAYMENT_METHOD:
      return {
        ...state,
        choosedPaymentMethodId: action.payload,
      };

    case OrderActionTypes.CREATE_ORDER_START:
      return {
        ...state,
        isOrderCreated: false,
        orderErrorMessage: null,
      };
    case OrderActionTypes.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        isOrderCreated: true,
        lastOrder: action.payload,
        orderErrorMessage: null,
      };
    case OrderActionTypes.CREATE_ORDER_FAIL:
      return {
        ...state,
        isOrderCreated: true,
        orderErrorMessage: action.payload,
      };
    default:
      return state;
  }
};
export default orderReducer;
