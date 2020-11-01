import * as actionTypes from "./actionTypes";

import agent from "../api/agent";

export function getCustomerInfoFunc(customerInfo) {
  return { type: actionTypes.GET_CUSTOMER_INFO, payload: customerInfo.data[0] };
}
export function getCustomerMoreInfoFunc(customerMoreInfo) {
  return {
    type: actionTypes.GET_CUSTOMER_MORE_INFO,
    payload: customerMoreInfo.data,
  };
}

export function getCustomerInfo(customerid) {
  return function (dispatch) {
    agent.Customers.getCustomerInfo(customerid).then((result) =>
      dispatch(getCustomerInfoFunc(result))
    );
  };
}

export function getCustomerMoreInfo(customerid) {
  return function (dispatch) {
    agent.Customers.getCustomerMoreInfo(customerid).then((result) =>
      dispatch(getCustomerMoreInfoFunc(result))
    );
  };
}
