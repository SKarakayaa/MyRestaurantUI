import UserActionTypes from "./user.types";
import agent from "../api/agent";

//USER INFO
export const fetchUserInfoStart = () => ({
  type: UserActionTypes.FETCH_USER_INFO_START,
});
export const fetchUserInfoSuccess = (userInfo) => ({
  type: UserActionTypes.FETCH_USER_INFO_SUCCESS,
  payload: userInfo.data[0],
});
export const fetchUserInfoStartAsync = (userid) => {
  return (dispatch) => {
    dispatch(fetchUserInfoStart());
    agent.Users.loadUserInfo(userid).then((result) =>
      dispatch(fetchUserInfoSuccess(result))
    );
  };
};
//UPDATE USER INFO
export const fetchUserInfoUpdateStart = () => ({
  type: UserActionTypes.EDIT_PROFILE_START,
});
export const fetchUserInfoUpdateSuccess = (userInfo) => ({
  type: UserActionTypes.EDIT_PROFILE_SUCCESS,
  payload: userInfo,
});
export const fetchUserInfoUpdateFail = (errorMessage) => ({
  type: UserActionTypes.EDIT_PROFILE_FAIL,
  payload: errorMessage,
});
export const fetchUserInfoUpdateAsync = (userInfo) => {
  return (dispatch) => {
    // dispatch(fetchUserInfoUpdateStart());
    return agent.Users.updateUser(userInfo)
      .then((result) => {
        if (result.success) {
          return dispatch(fetchUserInfoUpdateSuccess(userInfo));
        } else {
          let errmsg = "";
          result.errors.forEach((error) => {
            errmsg += error.dsc + " " + error.msg;
          });
          return dispatch(fetchUserInfoUpdateFail(errmsg));
        }
      })
      .catch((error) => dispatch(fetchUserInfoUpdateFail(error.message)));
  };
};

//USER ADDRESS
export const fetchUserAddressesStart = () => ({
  type: UserActionTypes.FETCH_USER_ADDRESSES_START,
});
export const fetchUserAddressesSuccess = (userAddresses) => ({
  type: UserActionTypes.FETCH_USER_ADDRESSES_SUCCESS,
  payload: userAddresses.data,
});
export const fetchUserAddressesStartAsync = (customerid, userid) => {
  return (dispatch) => {
    dispatch(fetchUserAddressesStart());
    agent.Address.loadAddresses(userid, customerid).then((result) =>
      dispatch(fetchUserAddressesSuccess(result))
    );
  };
};

//USER FAVORITE PRODUCT
export const fetchFavoriteProductsStart = () => ({
  type: UserActionTypes.FETCH_FAVORITE_PRODUCTS_START,
});
export const fetchFavoriteProductsSuccess = (favoriteProducts) => ({
  type: UserActionTypes.FETCH_FAVORITE_PRODUCTS_SUCCESS,
  payload: favoriteProducts.data,
});
export const fetchFavoriteProductsStartAsync = (userid, customerid) => {
  return (dispatch) => {
    dispatch(fetchFavoriteProductsStart());
    agent.Users.loadFavorites(userid, customerid).then((result) =>
      dispatch(fetchFavoriteProductsSuccess(result))
    );
  };
};
