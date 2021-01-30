import CommentActionTypes from "./comment.types";
import agent from "../api/agent";

//CUSTOMER COMMENTS
export const fetchCustomerCommentStart = () => ({
  type: CommentActionTypes.FETCH_CUSTOMER_COMMENTS_START,
});
export const fetchCustomerCommentSuccess = (customerComments) => ({
  type: CommentActionTypes.FETCH_CUSTOMER_COMMENTS_SUCCESS,
  payload: customerComments.data,
});
export const fetchCustomerCommentStartAsync = (customerid) => {
  return (dispatch) => {
    dispatch(fetchCustomerCommentStart());
    agent.Customers.loadCustomersComments(customerid).then((result) =>
      dispatch(fetchCustomerCommentSuccess(result))
    );
  };
};
export const seeAllComment = () => ({
  type: CommentActionTypes.SEE_ALL_COMMENTS,
});

export const fetchCustomerCommentAdd = (comment) => ({
  type: CommentActionTypes.ADD_COMMENT_SUCCESS,
  payload: comment,
});
export const fetchCustomerCommentAddAsync = (commentModel) => {
  return (dispatch) => {
    agent.Customers.addComment(commentModel).then((result) => {
      commentModel.frm_customer_comments_id =
        result.outs.frm_customer_comments_id;
      dispatch(fetchCustomerCommentAdd(commentModel));
    });
  };
};

export const fetchCustomerCommentUpdate = (comment) => ({
  type: CommentActionTypes.UPDATE_COMMENT_SUCCESS,
  payload: comment,
});
export const fetchCustomerCommentUpdateAsync = (comment) => {
  return (dispatch) => {
    agent.Customers.updateCustomerComment(comment).then((result) => {
      comment.frm_customer_comments_id = comment.tfrm_customer_comments_id;
      dispatch(fetchCustomerCommentUpdate(comment));
    });
  };
};
