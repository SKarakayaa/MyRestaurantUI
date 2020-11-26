import * as actionTypes from "./actionTypes";

import agent from "../api/agent";

//Connect to Reducers
export function loadProducts(products) {
  return { type: actionTypes.GET_PRODUCTS, payload: products.data };
}

export function loadMenus(products) {
  return {
    type: actionTypes.GET_MENUS,
    payload: products.data.filter((x) => x.is_menu === true),
  };
}

export function loadMenuOptions(menuOptions) {
  return { type: actionTypes.GET_MENU_OPTIONS, payload: menuOptions.data };
}

export function loadCategories(categories) {
  return { type: actionTypes.GET_PRODUCT_CATEGORIES, payload: categories.data };
}

export function loadMaterials(materials) {
  return { type: actionTypes.GET_MATERIALS, payload: materials.data };
}

// Requests to API
export function loadMenuOptionsRequest(customerid, productid) {
  return function (dispatch) {
    agent.Products.loadMenuOptions(parseInt(customerid), parseInt(productid)).then((result) =>
      dispatch(loadMenuOptions(result))
    );
  };
}

export function loadProductsRequest(customerid) {
  return function (dispatch) {
    agent.Products.loadProducts(customerid).then((result) =>
      dispatch(loadProducts(result))
    );
  };
}

export function loadMenusRequest(customerid) {
  return function (dispatch) {
    agent.Products.loadProducts(customerid).then((result) =>
      dispatch(loadMenus(result))
    );
  };
}

export function loadCategoriesRequest(customerid) {
  return function (dispatch) {
    agent.Products.loadCategories(customerid).then((result) =>
      dispatch(loadCategories(result))
    );
  };
}

export function loadMaterialsRequest(customerid) {
  return function (dispatch) {
    agent.Products.loadMaterials(customerid).then((result) =>
      dispatch(loadMaterials(result))
    );
  };
}
