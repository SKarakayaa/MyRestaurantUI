import * as actionTypes from "../../actions/actionTypes";

import initialState from "../initialState";

export default function customerCommentReduecer(
  state = initialState.customerComments,
  action
) {
  switch (action.type) {
    case actionTypes.GET_CUSTOMERS_COMMENTS:
      return action.payload;
    case actionTypes.ADD_CUSTOMER_COMMENT:
      return [...state, action.payload];
    case actionTypes.UPDATE_CUSTOMER_COMMENT:
      let findComment = state.find(
        (comment) =>
          comment.frm_customer_comments_id ===
          action.payload.tfrm_customer_comments_id
      );
      findComment.flavor = action.payload.flavor;
      findComment.comment = action.payload.comment;
      let updatedCustomerCommentsState = state.map((comment) => {
        if (
          comment.frm_customer_comments_id ===
          action.payload.tfrm_customer_comments_id
        ) {
          return Object.assign({}, findComment, comment);
        }
        return comment;
      });
      return updatedCustomerCommentsState;
    default:
      return state;
  }
}
