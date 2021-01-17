import { createSelector } from "reselect";
import memoize from "lodash.memoize";
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
  menus.products.filter((product) => product.product_category_id === "5")
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
