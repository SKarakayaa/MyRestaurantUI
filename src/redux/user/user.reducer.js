import UserActionTypes from "./user.types";

const INITIAL_STATE = {
  isFetchingUserInfo: true,
  userInfo: null,

  areFetchingUserAddresses: true,
  userAddresses: null,

  areFetchingFavorites: true,
  favoriteProducts: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.FETCH_USER_INFO_START:
      return {
        ...state,
        isFetchingUserInfo: true,
      };
    case UserActionTypes.FETCH_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        isFetchingUserInfo: false,
      };

    case UserActionTypes.FETCH_USER_ADDRESSES_START:
      return {
        ...state,
        areFetchingUserAddresses: true,
      };
    case UserActionTypes.FETCH_USER_ADDRESSES_SUCCESS:
      return {
        ...state,
        userAddresses: action.payload,
        areFetchingUserAddresses: false,
      };

    case UserActionTypes.FETCH_FAVORITE_PRODUCTS_START:
      return {
        ...state,
        areFetchingFavorites: true,
      };
    case UserActionTypes.FETCH_FAVORITE_PRODUCTS_SUCCESS:
      return {
        ...state,
        favoriteProducts: action.payload,
        areFetchingFavorites: false,
      };
    default:
      return state;
  }
};
export default userReducer;
