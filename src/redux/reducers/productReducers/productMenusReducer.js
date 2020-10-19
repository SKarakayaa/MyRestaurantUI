import * as actionTypes from "../../actions/actionTypes";
import initialState from "../initialState";

export default function productMenusReducer(
  state = initialState.menus,
  action
) {
  switch (action.type) {
    case actionTypes.GET_PRODUCT_MENUS:
      return action.payload;

    default:
      return state;
  }
}
