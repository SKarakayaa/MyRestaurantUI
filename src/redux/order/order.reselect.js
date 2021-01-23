import { createSelector } from "reselect";

const selectOrder = (state) => state.order;

export const selectAreFetchingOrderDetails = createSelector(
  [selectOrder],
  (order) => order.areFetchingOrderDetails
);
export const selectOrderDetails = createSelector(
  [selectOrder],
  (order) => order.orderDetails
);

export const selectIsFetchingUserOrderHistory = createSelector(
  [selectOrder],
  (order) => order.isFetchingUserOrderHistory
);
export const selectUserOrderHistory = createSelector(
  [selectOrder],
  (order) => order.userOrderHistory
);
