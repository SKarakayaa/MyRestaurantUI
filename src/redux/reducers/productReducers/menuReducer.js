import * as actionTypes from "../../actions/actionTypes";

import initialState from "../initialState";

export default function menuReducer(state = initialState.menus, action) {
  switch (action.type) {
    case actionTypes.GET_MENUS:
      return action.payload;
    default:
      return state;
  }
}
