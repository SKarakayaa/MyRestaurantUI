import Comments from "./comments.component";
import { CurrentCustomerId } from "../../componentsold/Helper";
import { Fragment } from "react";
import Ratings from "./ratings.component";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchCommentLikesStartAsync } from "../../redux/like/like.actions";
import { fetchCustomerCommentStartAsync } from "../../redux/comment/comment.actions";
import { selectAreLikesFetching } from "../../redux/like/like.reselect";
import { selectCustomerCommentsAreFetching } from "../../redux/comment/comment.reselect";
class RatingsAndReviews extends React.Component {
  componentDidMount() {
    const { loadCustomerComment, loadLikes } = this.props;
    loadCustomerComment(CurrentCustomerId());
    loadLikes(CurrentCustomerId());
  }
  render() {
    const { areCustomerCommentsFetching, areLikesFetching } = this.props;
    return (
      !areCustomerCommentsFetching &&
      !areLikesFetching && (
        <Fragment>
          <div className="bg-white rounded shadow-sm p-4 mb-4 clearfix graph-star-rating">
            <Ratings />
          </div>
          <Comments />
        </Fragment>
      )
    );
  }
}
const mapStateToProps = createStructuredSelector({
  areCustomerCommentsFetching: selectCustomerCommentsAreFetching,
  areLikesFetching: selectAreLikesFetching,
});
const mapDispatchToProps = (dispatch) => ({
  loadCustomerComment: (customerid) =>
    dispatch(fetchCustomerCommentStartAsync(customerid)),
  loadLikes: (customerid) => dispatch(fetchCommentLikesStartAsync(customerid)),
});
export default connect(mapStateToProps, mapDispatchToProps)(RatingsAndReviews);
