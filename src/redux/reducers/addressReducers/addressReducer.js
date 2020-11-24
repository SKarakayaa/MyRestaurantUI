import * as actionTypes from "../../actions/actionTypes";

import initialState from "../initialState";

export default function addressReducer(state = initialState.addresses, action) {
  switch (action.type) {
    case actionTypes.GET_USER_ADDRESSES:
      return action.payload;
    case actionTypes.CREATE_USER_ADDRESS_SUCCESS:
      return [...state, action.payload];
    case actionTypes.UPDATE_USER_ADDRESS_SUCCESS:
      return [...state, action.payload];
    case actionTypes.CREATE_USER_ADDRESS_FAIL:
      return action.payload;
    default:
      return state;
  }
}
