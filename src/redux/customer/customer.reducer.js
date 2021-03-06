import CustomerActionTypes from "./customer.types";

// ? haydiye.com için isMainSite:true ve customerId:null olmalı
// * tek site için isMainSite:false ve customerId: <Id> olmalı
const INITIAL_STATE = {
  isMainSite: true,
  customerId: null,

  isFetching: true,
  customerInfo: null,
  errorMessage: undefined,

  isCustomerMoreInfoFetching: true,
  customerMoreInfo: null,

  isSliderFetching: true,
  customerSlider: null,

  isGalleryFething: true,
  gallery: null,

  areFetchingPriceOfAreas: true,
  priceOfAreas: null,
};

const customerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CustomerActionTypes.CHANGE_CUSTOMER_ID:
      return {
        ...state,
        customerId: action.payload,
      };
    case CustomerActionTypes.FETCH_CUSTOMER_INFO_START:
      return {
        ...state,
        isFetching: true,
      };
    case CustomerActionTypes.FETCH_CUSTOMER_INFO_SUCCESS:
      if (action.payload === undefined) {
        return {
          ...state,
          isFetching: false,
          errorMessage: "Böyle Bir Restoran Bulunamadı !",
        };
      }
      return {
        ...state,
        isFetching: false,
        customerInfo: action.payload,
      };
    case CustomerActionTypes.FETCH_CUSTOMER_INFO_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };

    case CustomerActionTypes.FETCH_CUSTOMER_SLIDER_START:
      return {
        ...state,
        isSliderFetching: true,
      };
    case CustomerActionTypes.FETCH_CUSTOMER_SLIDER_SUCCESS:
      return {
        ...state,
        isSliderFetching: false,
        customerSlider: action.payload,
      };

    case CustomerActionTypes.FETCH_CUSTOMER_GALLERY_START:
      return {
        ...state,
        isGalleryFething: true,
      };
    case CustomerActionTypes.FETCH_CUSTOMER_GALLERY_SUCCESS:
      return {
        ...state,
        isGalleryFething: false,
        gallery: action.payload,
      };

    case CustomerActionTypes.FETCH_CUSTOMER_MORE_INFO_START:
      return {
        ...state,
        isCustomerMoreInfoFetching: true,
      };
    case CustomerActionTypes.FETCH_CUSTOMER_MORE_INFO_SUCCESS:
      return {
        ...state,
        isCustomerMoreInfoFetching: false,
        customerMoreInfo: action.payload,
      };
    case CustomerActionTypes.CREATE_REZERVATION_SUCCESS:
      return state;

    case CustomerActionTypes.FETCH_PRICE_OF_AREA_START:
      return {
        ...state,
        areFetchingPriceOfAreas: true,
      };
    case CustomerActionTypes.FETCH_PRICE_OF_AREA_SUCCESS:
      return {
        ...state,
        areFetchingPriceOfAreas: false,
        priceOfAreas: action.payload,
      };
    default:
      return state;
  }
};
export default customerReducer;
