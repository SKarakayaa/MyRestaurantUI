import * as actionTypes from "../../actions/actionTypes";
import initialState from "../initialState";

export default function orderDetailReducer(
  state = initialState.orderDetails,
  action
) {
  switch (action.type) {
    case actionTypes.GET_ORDER_DETAILS:
      return action.payload;

    default:
      return state;
  }
}
