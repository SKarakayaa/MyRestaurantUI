import * as actionTypes from "../../actions/actionTypes";

import initialState from "../initialState";

export default function customerCommentLikeReducer(
  state = initialState.customerCommentLike,
  action
) {
  switch (action.type) {
    case actionTypes.GET_CUSTOMER_COMMENT_LIKE:
      return action.payload;
    case actionTypes.ADD_CUSTOMER_COMMENT_LIKE:
      debugger;
      return [...state, action.payload];
    case actionTypes.UPDATE_CUSTOMER_COMMENT_LIKE:
      var commentLike = state.find(
        (like) =>
          like.frm_comment_like_user_id ===
          action.payload.tfrm_comment_like_user_id
      );
      commentLike.is_like_flag =
        action.payload.is_like_flag === true ? "1" : "0";
      return state.map((_commentLike) => {
        if (
          _commentLike.frm_comment_like_user_id ===
          action.payload.tfrm_comment_like_user_id
        ) {
          return Object.assign({}, commentLike, _commentLike);
        }
        return _commentLike;
      });
    case actionTypes.DELETE_CUSTOMER_COMMENT_LIKE:
      let newState = state.filter(
        (commentLike) =>
          commentLike.frm_comment_like_user_id !==
          action.payload
      );
      return newState;
    default:
      return state;
  }
}
