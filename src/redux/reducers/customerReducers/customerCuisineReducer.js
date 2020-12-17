import * as actionTypes from "../../actions/actionTypes";

import initialState from "../initialState";

export default function customerCuisineReducer(
  state = initialState.customerCuisines,
  action
) {
  switch (action.type) {
    case actionTypes.GET_CUSTOMER_CUISINES:
      return action.payload;
    default:
      return state;
  }
}
