import * as actionTypes from "../../actions/actionTypes";

import initialState from "../initialState";

export default function homepageReducer(
  state = initialState.customers,
  action
) {
  switch (action.type) {
    case actionTypes.GET_CUSTOMER_LIST:
      return action.payload;

    default:
      return state;
  }
}
