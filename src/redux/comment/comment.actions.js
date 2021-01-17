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
