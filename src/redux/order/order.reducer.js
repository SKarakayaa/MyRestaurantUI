import OrderActionTypes from "./order.types";

const INITIAL_STATE = {
  areFetchingOrderDetails: true,
  orderDetails: null,

  isFetchingUserOrderHistory: true,
  userOrderHistory: null,
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
    default:
      return state;
  }
};
export default orderReducer;
