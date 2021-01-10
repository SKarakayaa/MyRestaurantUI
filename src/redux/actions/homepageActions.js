import * as actionTypes from "./actionTypes";

import agent from "../api/agent";

export function loadCustomerList(customers) {
  return {
    type: actionTypes.GET_CUSTOMER_LIST,
    payload: customers.data,
  };
}

export function loadCuisines(customers) {
  return {
    type: actionTypes.GET_CUISINES,
    payload: customers.data,
  };
}

//Request To API
export function loadCustomerListRequest() {
  return function (dispatch) {
    agent.HomepageRequests.loadCustomers().then((result) =>
      dispatch(loadCustomerList(result))
    );
  };
}

export function loadCuisinesRequest() {
  return function (dispatch) {
    agent.HomepageRequests.laodCuisines().then((result) =>
      dispatch(loadCuisines(result))
    );
  };
}
