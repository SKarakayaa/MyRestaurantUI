import * as actionTypes from "./actionTypes";

import agent from "../api/agent";

export function loadCustomersComments(comments) {
  return { type: actionTypes.GET_CUSTOMERS_COMMENTS, payload: comments.data };
}

export function addCustomerComment(result, comment) {
  comment.frm_customer_comments_id = result.outs.frm_customer_comments_id;
  return { type: actionTypes.ADD_CUSTOMER_COMMENT, payload: comment };
}

//REQUEST TO API
export function loadCustomerCommentsRequest(customerid) {
  return function (dispatch) {
    agent.Customers.loadCustomersComments(customerid).then((result) =>
      dispatch(loadCustomersComments(result))
    );
  };
}

export function addCustomerCommentRequest(comment) {
  return function (dispatch) {
    agent.Customers.addComment(comment).then((result) =>
      dispatch(addCustomerComment(result, comment))
    );
  };
}
