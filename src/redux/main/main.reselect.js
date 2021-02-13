import { createSelector } from "reselect";

const selectMain = (state) => state.main;

export const selectCityId = createSelector([selectMain], (main) => main.cityId);

export const selectCountyId = createSelector(
  [selectMain],
  (main) => main.countyId
);

export const selectAreCustomersFetching = createSelector(
  [selectMain],
  (main) => main.areCustomersFetching
);
export const selectCustomers = createSelector(
  [selectMain],
  (main) => main.customers
);

export const selectAreCuisiniesFetching = createSelector(
  [selectMain],
  (main) => main.areCuisiniesFetching
);
export const selectCuisinies = createSelector(
  [selectMain],
  (main) => main.cuisines
);
