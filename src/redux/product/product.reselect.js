import { createSelector } from "reselect";
const selectProduct = (state) => state.products;

//PRODUCTS AND MENUS
export const selectAreFethingProducts = createSelector(
  [selectProduct],
  (products) => products.areFetchingProducts
);
export const selectProducts = createSelector(
  [selectProduct],
  (products) => products.products
);
export const selectMenus = createSelector([selectProduct], (menus) => 
   menus.products.filter((product) => product.is_menu === true)
);

//PRODUCT MATERIALS AND OPTIONS
export const selectAreFetchingProductMaterials = createSelector(
  [selectProduct],
  (products) => products.areFetchingProductMaterials
);
export const selectProductMaterials = createSelector(
  [selectProduct],
  (products) => products.productMaterials
);
export const selectMenuOptions = createSelector(
  [selectProduct],
  (products) => products.menuOptions
);
