import * as actionTypes from "./actionTypes";

import agent from "../api/agent";

export function loadCustomerCommentLike(commentLikeList) {
  return {
    type: actionTypes.GET_CUSTOMER_COMMENT_LIKE,
    payload: commentLikeList.data,
  };
}

export function addCustomerCommentLike(result, commentLikeModel) {
  commentLikeModel.frm_comment_like_user_id =
    result.outs.frm_comment_like_user_id;
  commentLikeModel.is_like_flag =
    commentLikeModel.is_like_flag === true ? "1" : "0";
  return {
    type: actionTypes.ADD_CUSTOMER_COMMENT_LIKE,
    payload: commentLikeModel,
  };
}

export function updateCustomerCommentLike(result, commentLikeModel) {
  return {
    type: actionTypes.UPDATE_CUSTOMER_COMMENT_LIKE,
    payload: commentLikeModel,
  };
}

export function deleteCustomerCommentLike(result, commentLikeId) {
  return {
    type: actionTypes.DELETE_CUSTOMER_COMMENT_LIKE,
    payload: commentLikeId,
  };
}

//Connect To API

export function addCustomerCommentLikeRequest(commentLikeModel) {
  return function (dispatch) {
    agent.Customers.addCustomerCommentLike(commentLikeModel).then((result) =>
      dispatch(addCustomerCommentLike(result, commentLikeModel))
    );
  };
}

export function loadCustomerCommentLikeRequest(customerid) {
  return function (dispatch) {
    agent.Customers.loadCustomerCommentLike(customerid).then((result) =>
      dispatch(loadCustomerCommentLike(result))
    );
  };
}

export function updateCustomerCommentLikeRequest(commentLikeModel) {
  return function (dispatch) {
    agent.Customers.updateCustomerCommentLike(commentLikeModel).then((result) =>
      dispatch(updateCustomerCommentLike(result, commentLikeModel))
    );
  };
}

export function deleteCustomerCommentLikeRequest(commentLikeId) {
  return function (dispatch) {
    agent.Customers.deleteCustomerCommentLike(commentLikeId).then((result) =>
      dispatch(updateCustomerCommentLike(result, commentLikeId))
    );
  };
}
