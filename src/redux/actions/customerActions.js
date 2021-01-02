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
export function loadCustomerSlider(customerSlider) {
  return {
    type: actionTypes.GET_CUSTOMER_SLIDER,
    payload: customerSlider.data.length !== 0 ? customerSlider.data[0] : [],
  };
}
export function loadCustomerGalery(customerGalery) {
  return {
    type: actionTypes.GET_CUSTOMER_GALERY,
    payload: customerGalery.data,
  };
}

export function loadCustomerCuisines(customerCuisines) {
  return {
    type: actionTypes.GET_CUSTOMER_CUISINES,
    payload: customerCuisines.data,
  };
}

export function loadPaymentMethod(paymentMethods) {
  return {
    type: actionTypes.GET_PAYMENT_METHODS,
    payload: paymentMethods.data,
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

export function loadCustomerSliderRequest(customerid) {
  return function (dispatch) {
    agent.Customers.loadCustomerSlider(customerid).then((result) =>
      dispatch(loadCustomerSlider(result))
    );
  };
}

export function loadCustomerGaleryRequest(customerId) {
  return function (dispatch) {
    agent.Customers.loadCustomerGalery(customerId).then((result) =>
      dispatch(loadCustomerGalery(result))
    );
  };
}

export function loadCustomerCuisinesRequest(customerId) {
  return function (dispatch) {
    agent.Customers.laodCustomerCuisines(customerId).then((result) =>
      dispatch(loadCustomerCuisines(result))
    );
  };
}

export function loadPaymentMethodRequest() {
  return function (dispatch) {
    agent.Customers.loadPaymentMethos().then((result) =>
      dispatch(loadPaymentMethod(result))
    );
  };
}
