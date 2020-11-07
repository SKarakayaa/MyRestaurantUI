import * as actionTypes from "../../actions/actionTypes";

import initialState from "../initialState";

export default function createOrderReducer(state = initialState.cart, action) {
  switch (action.type) {
    case actionTypes.CREATE_ORDER:
      return action.payload;
    default:
      return state;
  }
}
