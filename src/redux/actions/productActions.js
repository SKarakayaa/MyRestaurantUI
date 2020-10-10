import agent from "../api/agent";
import * as actionTypes from "./actionTypes";

export function getProductList(products) {
  return { type: actionTypes.GET_PRODUCTS, payload: products.data };
}

export function getMostPopularProducts(products) {
  return { type: actionTypes.GET_MOST_POPULAR_PRODUCTS, payload: products };
}

export function getProducts(customerid) {
  return function (dispatch) {
    agent.Products.list(customerid).then((result) =>
      dispatch(getProductList(result))
    );
  };
}
