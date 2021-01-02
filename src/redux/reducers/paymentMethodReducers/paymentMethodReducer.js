import * as actionTypes from "../../actions/actionTypes";

import initialState from "../initialState";

export default function paymentMethodReducer(
  state = initialState.paymentMethods,
  action
) {
  switch (action.type) {
    case actionTypes.GET_PAYMENT_METHODS:
      return action.payload;

    default:
      return state;
  }
}
