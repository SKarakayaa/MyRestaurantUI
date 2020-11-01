import * as actionTypes from "./actionTypes";

import agent from "../api/agent";

export function getProductList(products) {
  return { type: actionTypes.GET_PRODUCTS, payload: products.data };
}

export function getMostPopularProducts(products) {
  return { type: actionTypes.GET_MOST_POPULAR_PRODUCTS, payload: products };
}

export function getMenusFunc(products) {
  return {
    type: actionTypes.GET_MENUS,
    payload: products.data.filter((x) => x.is_menu === true),
  };
}

export function loadMenuOptions(menuOptions) {
  return { type: actionTypes.GET_MENU_OPTIONS, payload: menuOptions.data };
}

export function getProductCategoriesListFunc(categories) {
  return { type: actionTypes.GET_PRODUCT_CATEGORIES, payload: categories.data };
}

export function loadMenuOptionsRequest(customerid, productid) {
  return function (dispatch) {
    agent.Products.getMenuOptions(customerid, productid).then((result) =>
      dispatch(loadMenuOptions(result))
    );
  };
}

export function getProducts(customerid) {
  return function (dispatch) {
    agent.Products.list(customerid).then((result) =>
      dispatch(getProductList(result))
    );
  };
}

export function getMenus(customerid) {
  return function (dispatch) {
    agent.Products.list(customerid).then((result) =>
      dispatch(getMenusFunc(result))
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
