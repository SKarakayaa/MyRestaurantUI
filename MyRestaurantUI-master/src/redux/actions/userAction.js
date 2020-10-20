import agent from "../api/agent";
import * as actionTypes from "./actionTypes";

export function getUserAddressList(address) {
  debugger;
  return { type: actionTypes.GET_USER_ADDRESS, payload: address.data };
}

export function getUserAddress(customerid,userid) {
  return function (dispatch) {
    agent.Users.getUserAddress(customerid,userid).then((result) =>
      dispatch(getUserAddressList(result))
    );
  };
}

export function getUserOffersList(offers) {
  return { type: actionTypes.GET_USER_OFFERS, payload: offers.data };
}

export function getUserOffers(customerid,userid) {
  return function (dispatch) {
    agent.Users.getUserOffers(customerid,userid).then((result) =>
      dispatch(getUserOffersList(result))
    );
  };
}

export function getUserCardsList(cards) {
  return { type: actionTypes.GET_USER_CARDS, payload: cards.data };
}

export function getUserCards(customerid,userid) {
  return function (dispatch) {
    agent.Users.getUserCards(customerid,userid).then((result) =>
      dispatch(getUserCardsList(result))
    );
  };
}

export function getUserInfoList(info) {
  return { type: actionTypes.GET_USER_INFO, payload: info.data };
}

export function getUserInfo(customerid,userid) {
  return function (dispatch) {
    agent.Users.getUserInfo(customerid,userid).then((result) =>
      dispatch(getUserInfoList(result))
    );
  };
}

export function getUserFavoritesProductsList(favorites_products) {
  return { type: actionTypes.GET_USER_FAVORITES_PRODUCT, payload: favorites_products.data };
}

export function getUserFavoritesProducts(customerid,userid) {
  return function (dispatch) {
    agent.Users.getUserFavoritesProducts(customerid,userid).then((result) =>
      dispatch(getUserFavoritesProductsList(result))
    );
  };
}

export function getUserOrdersList(user_orders) {
  return { type: actionTypes.GET_USER_ORDERS, payload: user_orders.data };
}

export function getUserOrders(customerid,userid) {
  return function (dispatch) {
    agent.Users.getUserOrders(customerid,userid).then((result) =>
      dispatch(getUserOrdersList(result))
    );
  };
}

export function deleteUserCards(cards) {
  return { type: actionTypes.GET_USER_ORDERS, payload: cards.data };
}

// export function getUserOrders(customerid,userid) {
//   return function (dispatch) {
//     agent.UserOrders.getUserOrders(customerid,userid).then((result) =>
//       dispatch(getUserOrdersList(result))
//     );
//   };
// }
