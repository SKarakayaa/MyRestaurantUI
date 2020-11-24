import * as actionTypes from "./actionTypes";

import agent from "../api/agent";

//Connect to Reducers
export function loadAddresses(addresses) {
  return { type: actionTypes.GET_USER_ADDRESSES, payload: addresses.data };
}

export function createAddress(addressResult, addressModel) {
  if (addressResult.success) {
    return {
      type: actionTypes.CREATE_USER_ADDRESS_SUCCESS,
      payload: {
        frm_user_adress_id: addressResult.outs.frm_user_adress_id,
        is_default: addressModel.is_default,
        user_id: addressModel.user_id,
        location: addressModel.location,
        address_type: addressModel.address_type,
        delivery_area: addressModel.delivery_area,
        delivery_instructions: addressModel.delivery_instructions,
      },
    };
  } else {
    return {
      type: actionTypes.CREATE_USER_ADDRESS_FAIL,
      payload: addressResult,
    };
  }
}

export function updateAddress(addressResult, addressModel) {
  console.log("update address result : ",addressResult);
  if (addressResult.success) {
    return {
      type: actionTypes.UPDATE_USER_ADDRESS_SUCCESS,
      payload: {
        frm_user_adress_id: addressModel.tfrm_user_adress_id,
        is_default: addressModel.is_default,
        user_id: addressModel.user_id,
        location: addressModel.location,
        address_type: addressModel.address_type,
        delivery_area: addressModel.delivery_area,
        delivery_instructions: addressModel.delivery_instructions,
      },
    };
  } else {
    return {
      type: actionTypes.UPDATE_USER_ADDRESS_FAIL,
      payload: addressResult,
    };
  }
}
//Connect to API
export function loadAddressesRequest(customerid) {
  var user = JSON.parse(window.localStorage.getItem("user"));
  if (user !== null) {
    return function (dispatch) {
      agent.Address.loadAddresses(
        user.session.userId,
        customerid
      ).then((result) => dispatch(loadAddresses(result)));
    };
  }
}

export function createAddressRequest(address) {
  return function (dispatch) {
    return agent.Address.createAddress(address).then((result) =>
      dispatch(createAddress(result, address))
    );
  };
}

export function updateAddressRequest(address) {
  console.log("update address model : ",address);
  return function (dispatch) {
    return agent.Address.updateAddress(address).then((result) =>
      dispatch(updateAddress(result, address))
    );
  };
}
