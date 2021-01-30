import CommentActionTypes from "./comment.types";
import { updateComment } from "./comment.utils";

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

    case CommentActionTypes.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        customerComments: [...state.customerComments, { ...action.payload }],
      };
    case CommentActionTypes.UPDATE_COMMENT_SUCCESS:
      return {
        ...state,
        customerComments: updateComment(state.customerComments, action.payload),
      };
    default:
      return state;
  }
};
export default commentReducer;
