import * as actionTypes from "./actionTypes";

export function getCurrentUser(currentUser) {
  return { type: actionTypes.GET_CURRENT_USER, payload: currentUser };
}
