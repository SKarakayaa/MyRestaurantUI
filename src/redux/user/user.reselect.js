import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectIsFetchingUserInfo = createSelector(
  [selectUser],
  (user) => user.isFetchingUserInfo
);
export const selectUserInfo = createSelector(
  [selectUser],
  (user) => user.userInfo
);

export const selectAreAddressesFetching = createSelector(
  [selectUser],
  (user) => user.areFetchingUserAddresses
);
export const selectUserAddresses = createSelector(
  [selectUser],
  (user) => user.userAddresses
);
