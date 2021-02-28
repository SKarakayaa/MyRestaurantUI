import MainActionTypes from "./main.types";

const INITIAL_STATE = {
  cityId: 0,
  countyId: 0,

  areCustomersFetching: true,
  customers: null,

  densities: [
    { id: "2", name: "Busy" },
    { id: "1", name: "Available" },
  ],

  orderTimes: [
    { time: "20 - 25" },
    { time: "25 - 30" },
    { time: "30 - 35" },
    { time: "35 - 40" },
    { time: "40 - 45" },
  ],

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
    case MainActionTypes.CHOOSE_COUNTY:
      return {
        ...state,
        countyId: action.payload,
      };
    case MainActionTypes.FETCH_CUSTOMERS_START:
      return {
        ...state,
        areCustomersFetching: true,
      };
    case MainActionTypes.FETCH_CUSTOMERS_SUCCESS:
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
    case MainActionTypes.RESET_MAIN:
      return {
        ...state,
        areCustomersFetching: true,
        areCuisiniesFetching: true,
      };
    default:
      return state;
  }
};
export default mainReducer;
