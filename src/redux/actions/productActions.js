import agent from "../api/agent";
import * as actionTypes from "./actionTypes";

export function getProductList(products) {
  return { type: actionTypes.GET_PRODUCTS, payload: products.data };
}

export function getMostPopularProducts(products) {
  return { type: actionTypes.GET_MOST_POPULAR_PRODUCTS, payload: products };
}

export function getProductCategoriesListFunc(categories) {
  return { type: actionTypes.GET_PRODUCT_CATEGORIES, payload: categories.data };
}

export function getProductMenusFunc(menus) {
  return { type: actionTypes.GET_PRODUCT_MENUS, payload: menus.data };
}

export function getProducts(customerid) {
  return function (dispatch) {
    agent.Products.list(customerid).then((result) =>
      dispatch(getProductList(result))
    );
  };
}

export function getProductCategoriesList(customerid) {
  return function (dispatch) {
    agent.Products.getProductCategories(customerid).then((result) =>
      dispatch(getProductCategoriesListFunc(result))
    );
  };
}

export function getProductMenus(customerid) {
  return function (dispatch) {
    agent.Products.getProductMenus(customerid).then((result) =>
      dispatch(getProductMenusFunc(result))
    );
  };
}
