import ProductActionTypes from "./product.types";
import agent from "../api/agent";

export const fetchProductStart = () => ({
  type: ProductActionTypes.FETCH_PRODUCT_START,
});

export const fetchProductSuccess = (products) => ({
  type: ProductActionTypes.FETCH_PRODUCT_SUCCESS,
  payload: products.data,
});

export const fetchProductStartAsync = (customerid) => {
  return (dispatch) => {
    dispatch(fetchProductStart());
    agent.Products.loadProducts(customerid).then((result) =>
      dispatch(fetchProductSuccess(result))
    );
  };
};

//PRODUCT MATERIALS AND OPTİONS
export const fetchProductMaterialStart = () => ({
  type: ProductActionTypes.FETCH_PRODUCT_MATERIAL_START,
});
export const fetchProductMaterialSuccess = (productMaterials) => ({
  type: ProductActionTypes.FETCH_PRODUCT_MATERIAL_SUCCESS,
  payload: productMaterials.data,
});
export const fetchProductMaterialStartAsync = (customerid) => {
  return (dispatch) => {
    dispatch(fetchProductMaterialStart());
    agent.Products.loadMaterials(customerid).then((result) =>
      dispatch(fetchProductMaterialSuccess(result))
    );
  };
};

export const fetchMenuOptions = (menuOptions) => ({
  type: ProductActionTypes.FETCH_MENU_OPTIONS,
  payload: menuOptions.data,
});
export const fetchMenuOptionsAsync = (customerid, productid) => {
  return (dispatch) => {
    agent.Products.loadMenuOptions(customerid, productid).then((result) =>
      dispatch(fetchMenuOptions(result))
    );
  };
};
