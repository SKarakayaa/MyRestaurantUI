import {
  addLikeAsync,
  deleteLikeAsync,
  updateLikeAsync,
} from "../../redux/like/like.actions";
import {
  selectDislikeCounts,
  selectIsCurrentUserLike,
  selectLikeCounts,
} from "../../redux/like/like.reselect";

import AuthHelper from "../../helpers/authHelper";
import CommentHelper from "../../helpers/commentHelper";
import Icofont from "react-icofont";
import { Link } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";

class CommentLikeButtons extends React.Component {
  LikeComment = (isLike) => {
    const { isLiked, comment, addLike, updateLike, deleteLike } = this.props;
    if (isLiked !== undefined) {
      if (isLiked.is_like_flag !== isLike) {
        isLiked.is_like_flag = isLike;
        isLiked.tfrm_comment_like_user_id = isLiked.frm_comment_like_user_id;
        updateLike(isLiked);
      } else {
        deleteLike(isLiked.frm_comment_like_user_id);
      }
    } else {
      const likeModel = {
        comment_id: comment.frm_customer_comments_id,
        user_id: AuthHelper.GetCurrentUser().userId,
        is_like_flag: isLike,
      };
      addLike(likeModel);
    }
  };
  render() {
    const { isLiked, likeCount, dislikeCount } = this.props;
    return (
      <>
        <Link
          className="total-like"
          style={
            CommentHelper.LıkeButtonColor(isLiked, true)
              ? { color: "green" }
              : {}
          }
          onClick={() => this.LikeComment("1")}
          to="#"
        >
          <Icofont icon="thumbs-up" /> {likeCount}
        </Link>{" "}
        <Link
          className="total-like"
          onClick={() => this.LikeComment("0")}
          style={
            CommentHelper.LıkeButtonColor(isLiked, false)
              ? { color: "black" }
              : {}
          }
          to="#"
        >
          <Icofont icon="thumbs-down" />
          {dislikeCount}
        </Link>
      </>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  likeCount: selectLikeCounts(ownProps.comment.frm_customer_comments_id)(state),
  dislikeCount: selectDislikeCounts(ownProps.comment.frm_customer_comments_id)(
    state
  ),
  isLiked: selectIsCurrentUserLike(
    ownProps.comment.frm_customer_comments_id,
    AuthHelper.GetCurrentUser().userId
  )(state),
});
const mapDispatchToProps = (dispatch) => ({
  addLike: (like) => dispatch(addLikeAsync(like)),
  updateLike: (like) => dispatch(updateLikeAsync(like)),
  deleteLike: (likeid) => dispatch(deleteLikeAsync(likeid)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CommentLikeButtons);
