import * as actionTypes from "./actionTypes";

import agent from "../api/agent";

//Connect to Reducers
export function loadCustomerInfo(customerInfo) {
  return { type: actionTypes.GET_CUSTOMER_INFO, payload: customerInfo.data[0] };
}
export function loadCustomerMoreInfo(customerMoreInfo) {
  return {
    type: actionTypes.GET_CUSTOMER_MORE_INFO,
    payload: customerMoreInfo.data,
  };
}

//Request to API
export function loadCustomerInfoRequest(customerid) {
  return function (dispatch) {
    agent.Customers.loadCustomerInfo(customerid).then((result) =>
      dispatch(loadCustomerInfo(result))
    );
  };
}

export function loadCustomerMoreInfoRequest(customerid) {
  return function (dispatch) {
    agent.Customers.loadCustomerMoreInfo(customerid).then((result) =>
      dispatch(loadCustomerMoreInfo(result))
    );
  };
}
