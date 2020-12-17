import * as commentActions from "../../../redux/actions/commentActions";

import { Button, Form } from "react-bootstrap";
import React, { Component, Fragment } from "react";

import { CurrentCustomerId } from "../../Helper";
import { Link } from "react-router-dom";
import Review from "../../common/Review";
import StarRating from "../../common/StarRating";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import moment from "moment";

class Comments extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      seeCount: 2,
      users: [
        {
          name: "Osahan Singh",
          image: "/img/user/5.png",
          url: "#",
        },
        {
          name: "Gurdeep Osahan",
          image: "/img/user/2.png",
          url: "#",
        },
        {
          name: "Askbootstrap",
          image: "/img/user/3.png",
          url: "#",
        },
        {
          name: "Osahan Singh",
          image: "/img/user/4.png",
          url: "#",
        },
      ],
    };
  }
  componentDidMount() {
    if (this.props.customerComments.length === 0) {
      this.props.actions.loadCustomerCommentLoad(CurrentCustomerId());
    }
  }
  SeeAllComments = () => {
    this.setState({ seeCount: this.props.customerComments.length });
  };
  render() {
    const { customerComments } = this.props;
    return (
      <Fragment>
        <div className="bg-white rounded shadow-sm p-4 mb-4 restaurant-detailed-ratings-and-reviews">
          <Link to="#" className="btn btn-outline-primary btn-sm float-right">
            Top Rated
          </Link>
          <h5 className="mb-1">All Ratings and Reviews</h5>
          {customerComments &&
            customerComments.slice(0, this.state.seeCount).map((comment) => (
              <Fragment key={comment.frm_customer_comments_id}>
                <Review
                  image="/img/user/1.png"
                  ImageAlt=""
                  ratingStars={5}
                  Name="Singh Osahan"
                  userId={comment.user_id}
                  profileLink="#"
                  reviewDate={moment(comment.comment_date).format(
                    "dddd, MMMM Do YYYY"
                  )}
                  reviewText={comment.comment}
                  likes="0"
                  dislikes="0"
                  otherUsers={this.state.users}
                />
                <hr />
              </Fragment>
            ))}

          <Link
            className="text-center w-100 d-block mt-4 font-weight-bold"
            onClick={this.SeeAllComments}
            as={Button}
            to="#"
          >
            See All Reviews
          </Link>
        </div>
        <div className="bg-white rounded shadow-sm p-4 mb-5 rating-review-select-page">
          <h5 className="mb-4">Leave Comment</h5>
          <p className="mb-2">Rate the Place</p>
          <div className="mb-4">
            <div className="star-rating">
              <StarRating fontSize={26} star={5} getValue={this.getStarValue} />
            </div>
          </div>
          <Form>
            <Form.Group>
              <Form.Label>Your Comment</Form.Label>
              <Form.Control as="textarea" />
            </Form.Group>
            <Form.Group>
              <Button variant="primary" size="sm" type="button">
                {" "}
                Submit Comment{" "}
              </Button>
            </Form.Group>
          </Form>
        </div>
      </Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    customerComments: state.customerCommentReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCustomerCommentLoad: bindActionCreators(
        commentActions.loadCustomerCommentsRequest,
        dispatch
      ),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Comments);
