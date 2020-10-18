import * as actionTypes from "../../actions/actionTypes";
import initialState from "../initialState";

export default function currentUserReducer(
  state = initialState.currentUser,
  action
) {
  debugger;
  switch (action.type) {
    case actionTypes.GET_CURRENT_USER:
      return action.payload;
    case actionTypes.LOGIN:
      return action.payload
    default:
      return state;
  }
}
