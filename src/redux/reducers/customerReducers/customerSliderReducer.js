import initialState from "../initialState";
import * as actionTypes from "../../actions/actionTypes";
export default function customerSliderReducer(
  state = initialState.customerSlider,
  action
) {
  switch (action.type) {
    case actionTypes.GET_CUSTOMER_SLIDER:
      return action.payload;
    default:
      return state;
  }
}
