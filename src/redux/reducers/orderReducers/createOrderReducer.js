import * as actionTypes from "../../actions/actionTypes";

export default function createOrderReducer(state = null, action) {
  switch (action.type) {
    case actionTypes.CREATE_ORDER_SUCCESS:
      return action.payload;
    case actionTypes.CREATE_ORDER_FAIL:
      return action.payload;
    default:
      return state;
  }
}
