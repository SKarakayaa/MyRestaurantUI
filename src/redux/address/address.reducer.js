import AddressActionTypes from "./address.types";

const INITIAL_STATE = {
  areCitiesFetching: true,
  cities: null,

  areCountiesFetching: true,
  counties: null,

  areAreasFetching: true,
  areas: null,
};

const addressReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AddressActionTypes.FETCH_CITIES_START:
      return {
        ...state,
        areCitiesFetching: true,
        areCountiesFetching: true,
        counties: null,
        areAreasFetching: true,
        areas: null,
      };
    case AddressActionTypes.FETCH_CITIES_SUCCESS:
      return {
        ...state,
        cities: action.payload,
        areCitiesFetching: false,
      };
    case AddressActionTypes.FETCH_COUNTIES_START:
      return {
        ...state,
        areCountiesFetching: true,
        areAreasFetching: true,
        areas: null,
      };
    case AddressActionTypes.FETCH_COUNTIES_SUCCESS:
      return {
        ...state,
        counties: action.payload,
        areCountiesFetching: false,
      };
    case AddressActionTypes.FETCH_AREAS_START:
      return {
        ...state,
        areAreasFetching: true,
      };
    case AddressActionTypes.FETCH_AREAS_SUCCESS:
      return {
        ...state,
        areas: action.payload,
        areAreasFetching: false,
      };
    default:
      return state;
  }
};
export default addressReducer;
