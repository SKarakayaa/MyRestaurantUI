import * as actionTypes from "../../actions/actionTypes";

import initialState from "../initialState";

export default function cuisineReducer(
  state = initialState.cuisines,
  action
) {
  switch (action.type) {
    case actionTypes.GET_CUISINES:
      return action.payload;
    default:
      return state;
  }
}
