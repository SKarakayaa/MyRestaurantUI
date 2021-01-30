import LikeActionTypes from "./like.types";
import agent from "../api/agent";

export const fetchCommentLikesStart = () => ({
  type: LikeActionTypes.FETCH_COMMENT_LIKES_START,
});
export const fetchCommentLikesSuccess = (likes) => ({
  type: LikeActionTypes.FETCH_COMMENT_LIKES_SUCCESS,
  payload: likes.data,
});
export const fetchCommentLikesStartAsync = (customerid) => {
  return (dispatch) => {
    dispatch(fetchCommentLikesStart());
    agent.Customers.loadCustomerCommentLike(customerid).then((result) =>
      dispatch(fetchCommentLikesSuccess(result))
    );
  };
};

export const addLike = (like) => ({
  type: LikeActionTypes.ADD_LIKE_SUCCESS,
  payload: like,
});
export const addLikeAsync = (like) => {
  return (dispatch) => {
    agent.Customers.addCustomerCommentLike(like).then((result) => {
      like.frm_comment_like_user_id = result.outs.frm_comment_like_user_id.toString();
      dispatch(addLike(like));
    });
  };
};

export const updateLike = (like) => ({
  type: LikeActionTypes.UPDATE_LIKE_SUCCESS,
  payload: like,
});
export const updateLikeAsync = (like) => {
  return (dispatch) => {
    agent.Customers.updateCustomerCommentLike(like).then((result) => {
      like.frm_comment_like_user_id = like.tfrm_comment_like_user_id;
      dispatch(updateLike(like));
    });
  };
};

export const deleteLike = (likeid) => ({
  type: LikeActionTypes.DELETE_LIKE_SUCCESS,
  payload: likeid,
});
export const deleteLikeAsync = (likeid) => {
  return (dispatch) => {
    agent.Customers.deleteCustomerCommentLike(likeid).then((result) =>
      dispatch(deleteLike(likeid))
    );
  };
};
