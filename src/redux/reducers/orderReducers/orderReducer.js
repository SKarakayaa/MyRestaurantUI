import * as actionTypes from "../../actions/actionTypes";

import initialState from "../initialState";

export default function orderReducer(state = initialState.orders, action) {
  switch (action.type) {
    case actionTypes.GET_ORDERS:
      return action.payload;
    default:
      return state;
  }
}
