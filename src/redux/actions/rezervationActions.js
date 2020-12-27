import * as actionTypes from "./actionTypes";

import agent from "../api/agent";

export function addRezervation(result) {
  if (result.success) {
    return { type: actionTypes.ADD_REZERVATION_SUCCESS, payload: result };
  } else {
    return { type: actionTypes.ADD_REZERVATION_FAIL, payload: result };
  }
}

//Connect to API
export function addRezervationRequest(rezervationModel) {
  return function (dispatch) {
    return agent.Customers.addRezervation(rezervationModel).then((result) =>
      dispatch(addRezervation(result))
    );
  };
}
