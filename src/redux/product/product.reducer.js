import ProductActionTypes from "./product.types";

const INITIAL_STATE = {
  areFetchingProducts: true,
  areFetchingProductMaterials: true,

  products: null,
  productMaterials: null,
  menuOptions: null,
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductActionTypes.FETCH_PRODUCT_START:
      return {
        ...state,
        areFetchingProducts: true,
      };
    case ProductActionTypes.FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        areFetchingProducts: false,
        products: action.payload,
      };
    case ProductActionTypes.FETCH_PRODUCT_MATERIAL_START:
      return {
        ...state,
        areFetchingProductMaterials: true,
      };
    case ProductActionTypes.FETCH_PRODUCT_MATERIAL_SUCCESS:
      return {
        ...state,
        areFetchingProductMaterials: false,
        productMaterials: action.payload,
      };
    case ProductActionTypes.FETCH_MENU_OPTIONS:
      return {
        ...state,
        menuOptions: action.payload,
      };
    default:
      return state;
  }
};
export default productReducer;
