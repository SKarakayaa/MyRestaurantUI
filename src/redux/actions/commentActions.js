import * as actionTypes from "./actionTypes";

import agent from "../api/agent";

export function loadCustomersComments(comments) {
  return { type: actionTypes.GET_CUSTOMERS_COMMENTS, payload: comments.data };
}

//REQUEST TO API
export function loadCustomerCommentsRequest(customerid) {
  return function (dispatch) {
    agent.Customers.loadCustomersComments(customerid).then((result) =>
      dispatch(loadCustomersComments(result))
    );
  };
}
