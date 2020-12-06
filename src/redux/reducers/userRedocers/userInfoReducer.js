import * as actionTypes from "../../actions/actionTypes";

import initialState from "../initialState";

export default function userInfoReducer(state = initialState.userInfo, action) {
  switch (action.type) {
    case actionTypes.GET_USER_INFO:
      return action.payload;
    case actionTypes.UPDATE_USER_INFO_SUCCESS:
      let newState = state;
      newState.email = action.payload.email;
      newState.phone = action.payload.phone;
      return Object.assign({}, newState, state);
    default:
      return state;
  }
}
