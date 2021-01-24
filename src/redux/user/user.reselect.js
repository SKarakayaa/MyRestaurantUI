import { createSelector } from "reselect";
import memoize from "lodash.memoize";
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
export const selectUserAddress = memoize((addressId) =>
  createSelector([selectUser], (user) =>
    user.userAddresses.find(
      (address) => address.frm_user_adress_id === addressId
    )
  )
);

export const selectAreFetchingFavorites = createSelector(
  [selectUser],
  (user) => user.areFetchingFavorites
);
export const selectFavoriteProducts = createSelector(
  [selectUser],
  (user) => user.favoriteProducts
);
