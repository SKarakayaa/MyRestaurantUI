import CommentActionTypes from "./comment.types";

const INITIAL_STATE = {
  areCustomerCommentsFetching: true,
  customerComments: null,
  seeAll: false,
};

const commentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CommentActionTypes.FETCH_CUSTOMER_COMMENTS_START:
      return {
        ...state,
        areCustomerCommentsFetching: true,
      };
    case CommentActionTypes.FETCH_CUSTOMER_COMMENTS_SUCCESS:
      return {
        ...state,
        areCustomerCommentsFetching: false,
        customerComments: action.payload,
      };
    case CommentActionTypes.SEE_ALL_COMMENTS:
      return {
        ...state,
        seeAll: !state.seeAll,
      };
    default:
      return state;
  }
};
export default commentReducer;
