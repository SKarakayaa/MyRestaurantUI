import * as actionTypes from "../../actions/actionTypes";

import initialState from "../initialState";

export default function favoriteProductReducer(
  state = initialState.favoriteProducts,
  action
) {
  switch (action.type) {
    case actionTypes.ADD_FAVORITE_PRODUCT:
      action.payload.customer_id = 1;
      return [...state, action.payload];
    case actionTypes.GET_FAVORITE_PRODUCTS:
      return action.payload;
    default:
      return state;
  }
}
