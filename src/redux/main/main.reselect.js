import { createSelector } from "reselect";

const selectMain = (state) => state.main;

export const selectCityId = createSelector([selectMain], (main) => main.cityId);

export const selectAreCustomersFetching = createSelector(
  [selectMain],
  (main) => main.areCustomersFetching
);
export const selectCustomers = createSelector(
  [selectMain],
  (main) => main.customers
);
