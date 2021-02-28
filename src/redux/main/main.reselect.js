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
export const selectFileredCustomers = createSelector([selectMain], (main) => {
  console.log(main.cityId);
  return main.cityId !== 0 && main.countyId !== 0
    ? main.customers.filter(
        (customer) =>
          customer.city_id === main.cityId &&
          customer.counties_id.split(",").includes(main.countyId)
      )
    : main.customers;
});

export const selectAreCuisiniesFetching = createSelector(
  [selectMain],
  (main) => main.areCuisiniesFetching
);
export const selectCuisinies = createSelector(
  [selectMain],
  (main) => main.cuisines
);
export const selectDestinies = createSelector(
  [selectMain],
  (main) => main.densities
);
export const selectOrderTimes = createSelector(
  [selectMain],
  (main) => main.orderTimes
);
export const selectIsLeaveRestaurantPage = createSelector(
  [selectMain],
  (main) => main.isLeaveRestaurantPage
);
