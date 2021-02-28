import CategoryActionTypes from "./category.types";

const INITIAL_STATE = {
  isCategoriesFething: true,
  categories: null,
};

const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CategoryActionTypes.FETCH_CATEGORIES_START:
      return {
        ...state,
        isCategoriesFething: true,
      };
    case CategoryActionTypes.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        isCategoriesFething: false,
        categories: action.payload,
      };
    case CategoryActionTypes.RESET_CATEGORIES:
      return {
        ...state,
        isCategoriesFething: true,
      };
    default:
      return state;
  }
};
export default categoryReducer;
