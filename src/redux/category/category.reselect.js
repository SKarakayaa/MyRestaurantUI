import * as categoryTypesEnum from "../../enums/CategoryTypesEnum";

import { createSelector } from "reselect";

const selectCategory = (state) => state.categories;

export const selectCategoriesAreFething = createSelector(
  [selectCategory],
  (categories) => categories.isCategoriesFething
);

export const selectCategories = createSelector(
  [selectCategory],
  (categories) => categories.categories
);

export const bigListCategories = createSelector(
  [selectCategory],
  (categories) =>
    categories.categories !== undefined
      ? categories.categories.filter(
          (category) =>
            category.list_type === categoryTypesEnum.BIG_LIST_CATEGORY &&
            category.frm_product_categories_id !== "5"
        )
      : null
);

export const smallListCategories = createSelector(
  [selectCategory],
  (categories) =>
    categories.categories !== undefined
      ? categories.categories.filter(
          (category) =>
            category.list_type === categoryTypesEnum.SMALL_LIST_CATEGORY &&
            category.frm_product_categories_id !== "5"
        )
      : null
);
