import * as actionTypes from "../../actions/actionTypes";

import initialState from "../initialState";

export default function currentUserReducer(
  state = initialState.currentUser,
  action
) {
  switch (action.type) {
    case actionTypes.GET_CURRENT_USER:
      initialState.currentUser = action.payload;
      return action.payload;
    case actionTypes.LOGIN_SUCCESS:
      return action.payload;
    case actionTypes.LOGIN_ERROR:
      return action.payload;
    case actionTypes.LOGOUT:
      initialState.favoriteProducts = null;
      return action.payload;
    default:
      return state;
  }
}
