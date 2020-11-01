import * as actionTypes from "../../actions/actionTypes";

import initialState from "../initialState";

export default function productReducer(state = initialState.products, action) {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS:
      return action.payload;
    case actionTypes.GET_MOST_POPULAR_PRODUCTS:
      //TODO : most_populars = true bulunmadığı için şimdilik false
      const mostPopulars = state.filter((f) => f.most_populars === false);
      initialState.mostPopularProducts = mostPopulars;
      return mostPopulars;
    default:
      return state;
  }
}
