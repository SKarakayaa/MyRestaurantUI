import Comments from "./comments.component";
import { CurrentCustomerId } from "../../componentsold/Helper";
import { Fragment } from "react";
import Ratings from "./ratings.component";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchCustomerCommentStartAsync } from "../../redux/comment/comment.actions";
import { selectCustomerCommentsAreFetching } from "../../redux/comment/comment.reselect";

class RatingsAndReviews extends React.Component {
  componentDidMount() {
    const { loadCustomerComment } = this.props;
    loadCustomerComment(CurrentCustomerId());
  }
  render() {
    const { areCustomerCommentsFetching } = this.props;
    return (
      !areCustomerCommentsFetching && (
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
});
const mapDispatchToProps = (dispatch) => ({
  loadCustomerComment: (customerid) =>
    dispatch(fetchCustomerCommentStartAsync(customerid)),
});
export default connect(mapStateToProps, mapDispatchToProps)(RatingsAndReviews);