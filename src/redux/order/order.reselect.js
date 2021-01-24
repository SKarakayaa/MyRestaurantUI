import { createSelector } from "reselect";
import memoize from "lodash.memoize";

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

export const selectAreFetchingPaymentMethods = createSelector(
  [selectOrder],
  (order) => order.areFetchingPaymentMethods
);
export const selectPaymentMethods = createSelector(
  [selectOrder],
  (order) => order.paymentMethods
);
export const selectPaymentMethod = memoize((paymentMethodId) =>
  createSelector([selectOrder], (order) =>
    order.paymentMethods.find(
      (method) => method.frm_payment_method_id === paymentMethodId
    )
  )
);

export const selectChoosedAddressId = createSelector(
  [selectOrder],
  (order) => order.choosedAddressId
);
export const selectChoosedPaymentMethodId = createSelector(
  [selectOrder],
  (order) => order.choosedPaymentMethodId
);

export const selectIsOrderCreated = createSelector(
  [selectOrder],
  (order) => order.isOrderCreated
);
export const selectOrderErrorMessage = createSelector(
  [selectOrder],
  (order) => order.orderErrorMessage
);

export const selectLastOrder = createSelector(
  [selectOrder],
  (order) => order.lastOrder
);
