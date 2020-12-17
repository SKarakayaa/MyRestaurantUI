import * as actionTypes from "../../actions/actionTypes";

import initialState from "../initialState";

export default function customerGaleryReducer(
  state = initialState.customerGalery,
  action
) {
  switch (action.type) {
    case actionTypes.GET_CUSTOMER_GALERY:
      return action.payload;

    default:
      return state;
  }
}
