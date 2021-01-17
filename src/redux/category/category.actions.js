import CategoryActionTypes from "./category.types";
import agent from "../api/agent";

export const fetchCategoriesStart = () => ({
  type: CategoryActionTypes.FETCH_CATEGORIES_START,
});
export const fetchCategoriesSuccess = (categories) => ({
  type: CategoryActionTypes.FETCH_CATEGORIES_SUCCESS,
  payload: categories.data,
});
export const fetchCategoriesStartAsync = (customerid) => {
  return (dispatch) => {
    dispatch(fetchCategoriesStart());
    agent.Products.loadCategories(customerid).then((result) =>
      dispatch(fetchCategoriesSuccess(result))
    );
  };
};
