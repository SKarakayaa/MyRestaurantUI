import { Button, Image, Media } from "react-bootstrap";

import Icofont from "react-icofont";
import { Link } from "react-router-dom";
import React from "react";
import StarRating from "./star-rating.component";
import moment from "moment";

const CommentItem = ({ comment }) => (
  <div className="reviews-members pt-4 pb-4">
    {/* {this.state.isShowEditCommentModal ? (
      <UpdateCommentModal
        show={this.state.isShowEditCommentModal}
        comment={this.props.comment}
        onHide={this.onHideClick}
      />
    ) : null} */}
    <Media>
      <Link to="#">
        <Image
          alt="comment image"
          src="/img/user/1.png"
          className="mr-3 rounded-pill"
        />
      </Link>
      <Media.Body>
        <div className="reviews-members-header">
          <div className="star-rating float-right">
            <StarRating
              fontSize={14}
              disabled={true}
              star={parseInt(comment.flavor)}
            />
          </div>
          <h6 className="mb-1">
            <Link className="text-black" to="#">
              Singh Osahan
            </Link>
          </h6>
          <p className="text-gray">
            {moment(comment.comment_date).format("dddd, MMMM Do YYYY")}
            {/* {comment !== undefined ? comment.comment_user_name : ""} */}
          </p>
        </div>
        <div className="reviews-members-body">
          <p>{comment.comment}</p>
        </div>
        <div className="reviews-members-footer">
          <Link
            className="total-like"
            // style={
            //   commentLikeInformation.isLikeCurrentUser ? { color: "green" } : {}
            // }
            // onClick={() =>
            //   this.LikeComment(
            //     comment.frm_customer_comments_id,
            //     true,
            //     commentLikeInformation.commentLikeId
            //   )
            // }
            to="#"
            as={Button}
          >
            <Icofont icon="thumbs-up" /> 5
            {/* {commentLikeInformation.likeCount} */}
          </Link>{" "}
          <Link
            className="total-like"
            // onClick={() =>
            //   this.LikeComment(
            //     comment.frm_customer_comments_id,
            //     false,
            //     commentLikeInformation.commentLikeId
            //   )
            // }
            // style={
            //   commentLikeInformation.isLikeCurrentUser === false
            //     ? { color: "black" }
            //     : {}
            // }
            to="#"
          >
            <Icofont icon="thumbs-down" /> 3
            {/* {commentLikeInformation.dislikeCount} */}
          </Link>
          <br></br>
          <br></br>
          {/* {IsLogin() &&
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
          )} */}
        </div>
      </Media.Body>
    </Media>
  </div>
);
export default CommentItem;