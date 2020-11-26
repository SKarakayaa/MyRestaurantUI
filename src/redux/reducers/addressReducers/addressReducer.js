import * as actionTypes from "../../actions/actionTypes";

import initialState from "../initialState";

export default function addressReducer(state = initialState.addresses, action) {
  switch (action.type) {
    case actionTypes.GET_USER_ADDRESSES:
      return action.payload;
    case actionTypes.CREATE_USER_ADDRESS_SUCCESS:
      return [...state, action.payload];
    case actionTypes.UPDATE_USER_ADDRESS_SUCCESS:
      var address = state.find(
        (x) => x.frm_user_adress_id === action.payload.frm_user_adress_id
      );
      address.address_type = action.payload.address_type;
      address.delivery_area = action.payload.delivery_area;
      address.delivery_instructions = action.payload.delivery_instructions;
      address.is_default = action.payload.is_default;
      address.location = action.payload.location;
      var updatedAddressState = state.map((_address) => {
        if (_address.frm_user_adress_id === action.payload.frm_user_adress_id) {
          return Object.assign({}, address, _address);
        }
        return _address;
      });
      return updatedAddressState;
    case actionTypes.CREATE_USER_ADDRESS_FAIL:
      return action.payload;
    case actionTypes.DELETE_USER_ADDRESS:
      var newState = state.filter(x=>x.frm_user_adress_id !== action.payload.frm_user_adress_id);
      return newState;
    default:
      return state;
  }
}
