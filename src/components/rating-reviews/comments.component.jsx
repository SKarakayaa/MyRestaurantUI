import {
  selectCustomerComments,
  selectSeeAllComments,
} from "../../redux/comment/comment.reselect";

import { Button } from "react-bootstrap";
import CommentItem from "./comment-item.component";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { seeAllComment } from "../../redux/comment/comment.actions";

const Comments = ({ customerComments, seeCommentCount, seeAllComment }) => (
  <Fragment>
    <div className="bg-white rounded shadow-sm p-4 mb-4 restaurant-detailed-ratings-and-reviews">
      <Link to="#" className="btn btn-outline-primary btn-sm float-right">
        Top Rated
      </Link>
      <h5 className="mb-1">All Ratings and Reviews</h5>
      {customerComments.slice(0, seeCommentCount).map((comment) => (
        <Fragment key={comment.frm_customer_comments_id}>
          <CommentItem comment={comment} />

          <hr />
        </Fragment>
      ))}

      <Link
        className="text-center w-100 d-block mt-4 font-weight-bold"
        onClick={() => seeAllComment()}
        as={Button}
        to="#"
      >
        {seeCommentCount === 2 ? "See All Reviews" : "See Few Reviews"}
      </Link>
    </div>
  </Fragment>
);
const mapStateToProps = createStructuredSelector({
  customerComments: selectCustomerComments,
  seeCommentCount: selectSeeAllComments,
});
const mapDispatchToProps = (dispatch) => ({
  seeAllComment: () => dispatch(seeAllComment()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Comments);
