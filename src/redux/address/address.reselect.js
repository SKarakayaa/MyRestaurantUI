import { createSelector } from "reselect";

const selectAddress = (state) => state.address;

export const selectAreCitiesFetching = createSelector(
  [selectAddress],
  (address) => address.areCitiesFetching
);
export const selectCities = createSelector(
  [selectAddress],
  (address) => address.cities
);

export const selectAreCountiesFetching = createSelector(
  [selectAddress],
  (address) => address.areCountiesFetching
);
export const selectCounties = createSelector(
  [selectAddress],
  (address) => address.counties
);

export const selectAreAreasFetching = createSelector(
  [selectAddress],
  (address) => address.areAreasFetching
);
export const selectAreas = createSelector(
  [selectAddress],
  (address) => address.areas
);
