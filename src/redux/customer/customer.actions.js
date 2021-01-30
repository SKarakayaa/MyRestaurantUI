import CustomerActionTypes from "./customer.types";
import agent from "../api/agent";

export const changeCustomerIdAsync = (customerid) => ({
  type: CustomerActionTypes.CHANGE_CUSTOMER_ID,
  payload: customerid,
});

//CUSTOMER INFO ACTIONS
export const fetchCustomerInfoStart = () => ({
  type: CustomerActionTypes.FETCH_CUSTOMER_INFO_START,
});
export const fetchCustomerInfoSuccess = (customerInfo) => ({
  type: CustomerActionTypes.FETCH_CUSTOMER_INFO_SUCCESS,
  payload: customerInfo.data[0],
});
export const fetchCustomerInfoFailure = (errorMessage) => ({
  type: CustomerActionTypes.FETCH_CUSTOMER_INFO_FAILURE,
  payload: errorMessage,
});
export const fetchCustomerInfoStartAsync = (customerid) => {
  return (dispatch) => {
    dispatch(fetchCustomerInfoStart());
    agent.Customers.loadCustomerInfo(customerid)
      .then((result) => dispatch(fetchCustomerInfoSuccess(result)))
      .catch((error) => dispatch(fetchCustomerInfoFailure(error.message)));
  };
};

//CUSTOMER MORE INFO
export const fetchCustomerMoreInfoStart = () => ({
  type: CustomerActionTypes.FETCH_CUSTOMER_MORE_INFO_START,
});
export const fetchCustomerMoreInfoSuccess = (customerMoreInfos) => ({
  type: CustomerActionTypes.FETCH_CUSTOMER_MORE_INFO_SUCCESS,
  payload: customerMoreInfos.data,
});
export const fetchCustomerMoreInfoStartAsync = (customerid) => {
  return (dispatch) => {
    dispatch(fetchCustomerMoreInfoStart());
    agent.Customers.loadCustomerMoreInfo(customerid).then((result) =>
      dispatch(fetchCustomerMoreInfoSuccess(result))
    );
  };
};

//CUSTOMER SLIDER ACTIONS
export const fetchCustomerSliderStart = () => ({
  type: CustomerActionTypes.FETCH_CUSTOMER_SLIDER_START,
});

export const fetchCustomerSliderSuccess = (customerSlider) => ({
  type: CustomerActionTypes.FETCH_CUSTOMER_SLIDER_SUCCESS,
  payload: customerSlider.data[0],
});
export const fetchCustomerSliderStartAsync = (customerid) => {
  return (dispatch) => {
    dispatch(fetchCustomerSliderStart());
    agent.Customers.loadCustomerSlider(customerid).then((result) =>
      dispatch(fetchCustomerSliderSuccess(result))
    );
  };
};

//CUSTOMER GALLERY ACTIONS
export const fetchCustomerGalleryStart = () => ({
  type: CustomerActionTypes.FETCH_CUSTOMER_GALLERY_START,
});
export const fetchCustomerGallerySuccess = (customerGallery) => ({
  type: CustomerActionTypes.FETCH_CUSTOMER_GALLERY_SUCCESS,
  payload: customerGallery.data,
});
export const fetchCustomerGalleryStartAsync = (customerid) => {
  return (dispatch) => {
    dispatch(fetchCustomerGalleryStart());
    agent.Customers.loadCustomerGalery(customerid).then((result) =>
      dispatch(fetchCustomerGallerySuccess(result))
    );
  };
};

//REZERVATION
export const fetchCreateRezervation = () => ({
  type: CustomerActionTypes.CREATE_REZERVATION_SUCCESS,
});
export const fetchCreateRezervationAsync = (rezervation) => {
  return (dispatch) => {
    agent.Customers.addRezervation(rezervation).then((result) => {
      debugger;
      dispatch(fetchCreateRezervation(result));
    });
  };
};
