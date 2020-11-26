import * as actionTypes from "../../actions/actionTypes";

import initialState from "../initialState";

export default function createOrderReducer(
  state = initialState.orders,
  action
) {
  switch (action.type) {
    case actionTypes.GET_ORDERS:
      return action.payload;
    case actionTypes.CREATE_ORDER_SUCCESS:
      initialState.cart = [];
      return action.payload;
    case actionTypes.CREATE_ORDER_FAIL:
      return action.payload;
    default:
      return state;
  }
}
