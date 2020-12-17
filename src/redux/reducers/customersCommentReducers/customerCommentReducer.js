import * as actionTypes from "../../actions/actionTypes";

import initialState from "../initialState";

export default function customerCommentReduecer(
  state = initialState.customerComments,
  action
) {
  switch (action.type) {
    case actionTypes.GET_CUSTOMERS_COMMENTS:
      return action.payload;
    case actionTypes.ADD_CUSTOMER_COMMENT:
      return [...state, action.payload];
    default:
      return state;
  }
}
