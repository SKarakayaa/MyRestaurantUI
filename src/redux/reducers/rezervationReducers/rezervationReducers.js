import * as actionTypes from "../../actions/actionTypes";

export default function rezervationReducer(state=null,action) {
  switch (action.type) {
    case actionTypes.ADD_REZERVATION_SUCCESS:
      return action.payload;
    case actionTypes.ADD_REZERVATION_FAIL:
      return action.payload;
    default:
      return null;
  }
}
