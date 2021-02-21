import AuthHelper from "../../helpers/authHelper";
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
export const fetchUserAddressesStartAsync = (userid) => {
  return (dispatch) => {
    dispatch(fetchUserAddressesStart());
    agent.Address.loadAddresses(userid).then((result) =>
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
export const addFavorite = (favorite) => ({
  type: UserActionTypes.ADD_FAVORITE,
  payload: favorite,
});
export const deleteFavorite = (favoriteId) => ({
  type: UserActionTypes.DELETE_FAVORITE,
  payload: favoriteId,
});
export const favoriteAsync = (product, customerid, isFavorite, favoriteid) => {
  return (dispatch) => {
    if (isFavorite) {
      agent.Users.deleteFavorite(favoriteid).then((result) =>
        dispatch(deleteFavorite(favoriteid))
      );
    } else {
      let model = {
        user_id: AuthHelper.GetCurrentUser().userId + "",
        product_id: parseInt(product.frm_product_id) + "",
        customer_id: customerid,
      };
      agent.Users.addFavorite(model).then((result) => {
        debugger;
        dispatch(
          addFavorite({
            ...model,
            frm_user_product_favorites_id:
              result.outs.frm_user_product_favorites_id,
          })
        );
      });
    }
  };
};

//USER ADDRESS
export const fetchCreateAddressSuccess = (addressModel) => ({
  type: UserActionTypes.CREATE_ADDRESS_SUCCESS,
  payload: addressModel,
});
export const fetchCreateAddressFail = (errorMessage) => ({
  type: UserActionTypes.CREATE_ADDRESS_FAIL,
  payload: errorMessage,
});
export const fetchCreateAddressAsync = (addressModel) => {
  return (dispatch) => {
    return agent.Address.createAddress(addressModel)
      .then((result) => {
        if (result.success) {
          return dispatch(
            fetchCreateAddressSuccess({
              ...addressModel,
              frm_user_adress_id: result.outs.frm_user_adress_id,
            })
          );
        } else {
          let errmsg = "";
          result.errors.forEach((error) => {
            errmsg += error.dsc + " " + error.msg;
          });
          return dispatch(fetchCreateAddressFail(errmsg));
        }
      })
      .catch((error) => dispatch(fetchCreateAddressFail(error.message)));
  };
};

export const fetchUpdateAddressSuccess = (addressModel) => ({
  type: UserActionTypes.UPDATE_ADDRESS_SUCCESS,
  payload: addressModel,
});
export const fetchUpdateAddressFail = (errorMessage) => ({
  type: UserActionTypes.UPDATE_ADDRESS_FAIL,
  payload: errorMessage,
});
export const fetchUpdateAddressAsync = (addressModel) => {
  return (dispatch) => {
    return agent.Address.updateAddress(addressModel).then((result) => {
      if (result.success) {
        return dispatch(fetchUpdateAddressSuccess(addressModel));
      } else {
        let errmsg = "";
        result.errors.forEach((error) => {
          errmsg += error.dsc + " " + error.msg;
        });
        return dispatch(fetchUpdateAddressFail(errmsg));
      }
    });
  };
};

export const fetchDeleteAddressSuccess = (addressid) => ({
  type: UserActionTypes.DELETE_ADDRESS_SUCCESS,
  payload: addressid,
});
export const fetchDeleteAddressFail = (errorMesssage) => ({
  type: UserActionTypes.DELETE_ADDRESS_FAIL,
  payload: errorMesssage,
});
export const fetchDeleteAddressAsync = (addressid) => {
  return (dispatch) => {
    agent.Address.deleteAddress(addressid).then((result) => {
      debugger;
      if (result.success) {
        dispatch(fetchDeleteAddressSuccess(addressid));
      } else {
        dispatch(fetchDeleteAddressFail(result.errors[0].msg));
      }
    });
  };
};
