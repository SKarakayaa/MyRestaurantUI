import { createSelector } from "reselect";

const selectCustomer = (state) => state.customer;

//CUSTOMER INFO
export const selectCustomerInfo = createSelector(
  [selectCustomer],
  (customer) => customer.customerInfo
);

export const selectCustomerInfoIsFetching = createSelector(
  [selectCustomer],
  (customer) => customer.isFetching
);

export const selectCustomerPaymentMethods = createSelector(
  [selectCustomer],
  (customer) => customer.customerInfo.payment_method_id.split(",")
);

//CUSTOMER MORE INFO
export const selectCustomerMoreInfoIsFetching = createSelector(
  [selectCustomer],
  (customer) => customer.isCustomerMoreInfoFetching
);
export const selectCustomerMoreInfo = createSelector(
  [selectCustomer],
  (customer) => customer.customerMoreInfo
);

//CUSTOMER SLIDER
export const selectCustomerSliderIsFetching = createSelector(
  [selectCustomer],
  (customer) => customer.isSliderFetching
);
export const selectCustomerSlider = createSelector(
  [selectCustomer],
  (customer) => customer.customerSlider
);

//CUSTOMER GALLERY
export const selectCustomerGalleryIsFetching = createSelector(
  [selectCustomer],
  (customer) => customer.isGalleryFething
);
export const selectCustomerGallery = createSelector(
  [selectCustomer],
  (customer) => customer.gallery
);
