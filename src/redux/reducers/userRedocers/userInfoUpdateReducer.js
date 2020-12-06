import * as actionTypes from "../../actions/actionTypes";
export default function userInfoUpdateReducer(state = null, action) {
  switch (action.type) {
    case actionTypes.UPDATE_USER_INFO_FAIL:
      return action.payload;
    default:
      return state;
  }
}
