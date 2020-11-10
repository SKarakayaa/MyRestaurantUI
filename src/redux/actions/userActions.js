import * as actionTypes from "./actionTypes";

import agent from "../api/agent";

export function getCurrentUser() {
  const currentUser = JSON.parse(window.localStorage.getItem("user"));
  return {
    type: actionTypes.GET_CURRENT_USER,
    payload: currentUser === null ? {} : currentUser,
  };
}

export function logout() {
  window.localStorage.removeItem("user");
  window.localStorage.removeItem("token");
  return { type: actionTypes.LOGOUT, payload: null };
}

export function register(registerResult) {
  if (registerResult.success) {
    var userRoleModel = {
      user_id: registerResult.outs.user_id,
      role_id: 1,
    };
    agent.Users.addRole(userRoleModel);
    return { type: actionTypes.REGISTER_SUCCESS, payload: registerResult };
  } else {
    return { type: actionTypes.REGISTER_ERROR, payload: registerResult };
  }
}

export function login(loginResult) {
  if (loginResult.success) {
    localStorage.setItem("user", JSON.stringify(loginResult));
    localStorage.setItem("token", loginResult.token);
    return { type: actionTypes.LOGIN_SUCCESS, payload: loginResult };
  } else {
    return { type: actionTypes.LOGIN_ERROR, payload: loginResult };
  }
}

export function addFavorite(addFavoriteResult) {
  return { type: actionTypes.ADD_FAVORITE_PRODUCT, payload: addFavoriteResult };
}

export function deleteFavorite(deleteFavoriteResult) {
  console.log("delete favorite result : ",deleteFavoriteResult);
  return {
    type: actionTypes.DELETE_FAVORITE_PRODUCT,
    payload: deleteFavoriteResult,
  };
}

export function loadFavorites(favoriteProducts) {
  return {
    type: actionTypes.GET_FAVORITE_PRODUCTS,
    payload: favoriteProducts.data,
  };
}

//Request to API
export function registerRequest(user) {
  return function (dispatch) {
    return agent.Users.register(user)
      .then((result) => dispatch(register(result)))
      .catch((error) => {
        throw error;
      });
  };
}
export function loginRequest(loginModel) {
  return function (dispatch) {
    return agent.Users.login(loginModel)
      .then((result) => dispatch(login(result)))
      .catch((error) => {
        throw error;
      });
  };
}

export function addFavoriteRequest(userid, productid) {
  return function (dispatch) {
    const addFavoriteModel = {
      user_id: userid,
      product_id: productid,
    };
    agent.Users.addFavorite(addFavoriteModel).then((result) => {
      if (result.success) {
        dispatch(
          addFavorite({
            frm_user_product_favorites_id:
              result.outs.frm_user_product_favorites_id,
            user_id: userid,
            product_id: productid,
          })
        );
      }
    });
  };
}
export function deleteFavoriteRequest(favoriteid) {
  return function (dispatch) {
    agent.Users.deleteFavorite(favoriteid).then((result) => {
      dispatch(deleteFavorite(result));
    });
  };
}

export function loadFavoritesRequest(customerid) {
  const currentUser = JSON.parse(window.localStorage.getItem("user"));
  if (currentUser !== null) {
    return function (dispatch) {
      agent.Users.loadFavorites(
        currentUser.session.userId,
        customerid
      ).then((result) => dispatch(loadFavorites(result)));
    };
  }
}
