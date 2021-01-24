import OrderActionTypes from "./order.types";
import agent from "../api/agent";

export const fetchOrderDetailStart = () => ({
  type: OrderActionTypes.FETCH_ORDER_DETAIL_START,
});
export const fetchOrderDetailSuccess = (orderDetails) => ({
  type: OrderActionTypes.FETCH_ORDER_DETAIL_SUCCESS,
  payload: orderDetails.data,
});
export const fetchOrderDetailStartAsync = (orderid) => {
  return (dispatch) => {
    dispatch(fetchOrderDetailStart());
    agent.Orders.loadOrderDetails(orderid).then((result) =>
      dispatch(fetchOrderDetailSuccess(result))
    );
  };
};

export const fetchUserOrderHistoryStart = () => ({
  type: OrderActionTypes.FETCH_USER_ORDER_HISTORY_START,
});
export const fetchUserOrderHistorySuccess = (orderHistory) => ({
  type: OrderActionTypes.FETCH_USER_ORDER_HISTORY_SUCCESS,
  payload: orderHistory.data,
});
export const fetchUserOrderHistoryStartAsync = (customerid, userid) => {
  return (dispatch) => {
    dispatch(fetchUserOrderHistoryStart());
    agent.Orders.loadOrders(customerid, userid).then((result) =>
      dispatch(fetchUserOrderHistorySuccess(result))
    );
  };
};

export const fetchPaymentMethodsStart = () => ({
  type: OrderActionTypes.FETCH_PAYMENT_METHODS_START,
});
export const fetchPaymentMethodsSuccess = (paymentMethods) => ({
  type: OrderActionTypes.FETCH_PAYMENT_METHODS_SUCCESS,
  payload: paymentMethods.data,
});
export const fetchPaymentMethodsStartAsync = () => {
  return (dispatch) => {
    dispatch(fetchPaymentMethodsStart());
    agent.Customers.loadPaymentMethos().then((result) =>
      dispatch(fetchPaymentMethodsSuccess(result))
    );
  };
};

export const chooseAddress = (addressId) => ({
  type: OrderActionTypes.CHOOSE_ADDRESS,
  payload: addressId,
});
export const choosePaymentMethod = (paymentMethodId) => ({
  type: OrderActionTypes.CHOOSE_PAYMENT_METHOD,
  payload: paymentMethodId,
});
