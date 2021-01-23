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
