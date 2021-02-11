import MainActionTypes from "./main.types";

const INITIAL_STATE = {
  cityId: 0,

  areCustomersFetching: true,
  customers: null,

  areCuisiniesFetching: true,
  cuisines: null,
};

const mainReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MainActionTypes.CHOOSE_CITY:
      return {
        ...state,
        cityId: action.payload,
      };
    case MainActionTypes.FETCH_CUSTOMERS_START:
      return {
        ...state,
        areCustomersFetching: true,
      };
    case MainActionTypes.FETCH_CUSTOMERS_SUCCESS:
      debugger;
      return {
        ...state,
        areCustomersFetching: false,
        customers: action.payload,
      };
    case MainActionTypes.FETCH_CUISINES_START:
      return {
        ...state,
        areCuisiniesFetching: true,
      };
    case MainActionTypes.FETCH_CUISINES_SUCCESS:
      return {
        ...state,
        areCuisiniesFetching: false,
        cuisines: action.payload,
      };
    default:
      return state;
  }
};
export default mainReducer;
