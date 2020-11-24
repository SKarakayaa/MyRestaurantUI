import initialState from "../initialState";
import * as actionTypes from "../../actions/actionTypes";

export default function userInfoReducer(state = initialState.userInfo, action) {
  switch (action.type) {
    case actionTypes.GET_USER_INFO:
      return action.payload;
    default:
      return state;
  }
}
