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
