import { Image, Media } from "react-bootstrap";

import AuthHelper from "../../helpers/authHelper";
import CommentButtons from "../buttons/comment-buttons.component";
import CommentLikeButtons from "../buttons/comment-like-buttons.component";
import { Link } from "react-router-dom";
import React from "react";
import StarRating from "./star-rating.component";

const CommentItem = ({ comment }) => (
  <div className="reviews-members pt-4 pb-4">
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
              {comment.comment_user_name}
            </Link>
          </h6>
          <p className="text-gray">{comment.comment_date}</p>
        </div>
        <div className="reviews-members-body">
          <p>{comment.comment}</p>
        </div>
        <div className="reviews-members-footer">
          <CommentLikeButtons comment={comment} />
          <br></br>
          <br></br>
          {AuthHelper.IsLogin() &&
            AuthHelper.GetCurrentUser().userId ===
              parseInt(comment.user_id) && <CommentButtons comment={comment} />}
        </div>
      </Media.Body>
    </Media>
  </div>
);
export default CommentItem;
