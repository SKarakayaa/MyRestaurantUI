import * as actionTypes from "../../actions/actionTypes";
import initialState from "../initialState";

export default function registerUserReducer(
  state = initialState.registerUser,
  action
) {
  switch (action.type) {
    case actionTypes.REGISTER:
      return action.payload;

    default:
      return state;
  }
}
