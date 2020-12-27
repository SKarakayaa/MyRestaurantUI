import * as commentLikeActions from "../../redux/actions/commentLikeActions";

import { Button, Image, Media } from "react-bootstrap";
import IsLogin, { GetCurrentUser } from "../Helper";
import React, { Component } from "react";

import Icofont from "react-icofont";
import { Link } from "react-router-dom";
import StarRating from "../common/StarRating";
import UpdateCommentModal from "../modals/UpdateCommentModal";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Review extends Component {
  constructor() {
    super();
    this.state = {
      isShowEditCommentModal: false,
    };
  }
  onShowClick = () => this.setState({ isShowEditCommentModal: true });
  onHideClick = () => this.setState({ isShowEditCommentModal: false });
  LikeComment = (commentId, isLike, commentLikeId) => {
    const { commentLikeInformation } = this.props;
    if (commentLikeInformation.isLikeCurrentUser === null) {
      this.props.actions.addCommentLike({
        comment_id: parseInt(commentId),
        user_id: GetCurrentUser().userId,
        is_like_flag: isLike,
      });
    } else {
      isLike === commentLikeInformation.isLikeCurrentUser
        ? this.props.actions.deleteCommentsLike({
            tfrm_comment_like_user_id: commentLikeId,
          })
        : this.props.actions.updateCommentLike({
            tfrm_comment_like_user_id: commentLikeId,
            comment_id: commentId,
            user_id: GetCurrentUser().userId,
            is_like_flag: isLike,
          });
    }
  };
  render() {
    const { currentUser, comment, commentLikeInformation } = this.props;
    return (
      <div className="reviews-members pt-4 pb-4">
        {this.state.isShowEditCommentModal ? (
          <UpdateCommentModal
            show={this.state.isShowEditCommentModal}
            comment={this.props.comment}
            onHide={this.onHideClick}
          />
        ) : null}
        <Media>
          <Link to="#">
            <Image
              alt={this.props.imageAlt}
              src={this.props.image}
              className="mr-3 rounded-pill"
            />
          </Link>
          <Media.Body>
            <div className="reviews-members-header">
              <div className="star-rating float-right">
                <StarRating
                  fontSize={14}
                  disabled={true}
                  star={this.props.ratingStars}
                  getValue={() => {}}
                />
              </div>
              <h6 className="mb-1">
                <Link className="text-black" to={this.props.profileLink}>
                  {this.props.name}
                </Link>
              </h6>
              <p className="text-gray">
                {this.props.reviewDate} -{" "}
                {comment !== undefined ? comment.comment_user_name : ""}
              </p>
            </div>
            <div className="reviews-members-body">
              <p>{this.props.reviewText}</p>
            </div>
            <div className="reviews-members-footer">
              <Link
                className="total-like"
                style={
                  commentLikeInformation.isLikeCurrentUser
                    ? { color: "green" }
                    : {}
                }
                onClick={() =>
                  this.LikeComment(
                    comment.frm_customer_comments_id,
                    true,
                    commentLikeInformation.commentLikeId
                  )
                }
                to="#"
                as={Button}
              >
                <Icofont icon="thumbs-up" /> {commentLikeInformation.likeCount}
              </Link>{" "}
              <Link
                className="total-like"
                onClick={() =>
                  this.LikeComment(
                    comment.frm_customer_comments_id,
                    false,
                    commentLikeInformation.commentLikeId
                  )
                }
                style={
                  commentLikeInformation.isLikeCurrentUser === false
                    ? { color: "black" }
                    : {}
                }
                to="#"
              >
                <Icofont icon="thumbs-down" />{" "}
                {commentLikeInformation.dislikeCount}
              </Link>
              <br></br>
              <br></br>
              {IsLogin() &&
              currentUser.session.userId === parseInt(this.props.userId) ? (
                <>
                  <Link
                    to="#"
                    className="w-100 mt-4 font-weight-bold ml-2"
                    onClick={() => this.onShowClick()}
                  >
                    <i className="icofont-ui-edit"></i> Edit Comment
                  </Link>
                  &emsp;
                  <Link
                    to="#"
                    className="w-100 mt-4 font-weight-bold ml-2"
                    onClick={() => this.onShowClick()}
                  >
                    <i className="icofont-ui-delete"></i> Delete Comment
                  </Link>
                </>
              ) : (
                ""
              )}
            </div>
          </Media.Body>
        </Media>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    currentUser: state.currentUserReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      addCommentLike: bindActionCreators(
        commentLikeActions.addCustomerCommentLikeRequest,
        dispatch
      ),
      updateCommentLike: bindActionCreators(
        commentLikeActions.updateCustomerCommentLikeRequest,
        dispatch
      ),
      deleteCommentsLike: bindActionCreators(
        commentLikeActions.deleteCustomerCommentLikeRequest,
        dispatch
      ),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Review);
