import * as commentActions from "../../../redux/actions/commentActions";

import { Button, Form } from "react-bootstrap";
import React, { Component, Fragment } from "react";

import { CurrentCustomerId } from "../../Helper";
import { Link } from "react-router-dom";
import Review from "../../common/Review";
import StarRating from "../../common/StarRating";
import alertify from "alertifyjs";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import moment from "moment";

class Comments extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isAllComment: false,
      newComment: "",
      point: 0,
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
    this.setState({ isAllComment: !this.state.isAllComment });
  };
  HandleChange = (event) => {
    this.setState({ newComment: event.target.value });
  };
  HandlePoint = (point) => {
    this.setState({ point: point });
  };
  HandleSubmit = (event) => {
    event.preventDefault();
    const validateResult = this.ValidateCommentForm();
    if (validateResult === true) {
      const comment = {
        user_id: this.props.currentUser.session.userId,
        flavor: this.state.point,
        comment: this.state.newComment,
        customer_id: CurrentCustomerId(),
        comment_date: new Date(),
      };
      this.props.actions.addCustomerComment(comment);
      this.setState({ newComment: "" });
      alertify.success("Comments is successfull !");
    }
  };
  ValidateCommentForm = () => {
    if (this.state.point === 0 || this.state.newComment === "") {
      alertify.error("Please give an point and make a comment !");
      return false;
    }
    return true;
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
          {customerComments && this.state.isAllComment === false
            ? customerComments.slice(0, 2).map((comment) => (
                <Fragment key={comment.frm_customer_comments_id}>
                  <Review
                    image="/img/user/1.png"
                    ImageAlt=""
                    ratingStars={parseInt(comment.flavor)}
                    Name="Singh Osahan"
                    comment={comment}
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
              ))
            : customerComments.map((comment) => (
                <Fragment key={comment.frm_customer_comments_id}>
                  <Review
                    image="/img/user/1.png"
                    ImageAlt=""
                    comment={comment}
                    ratingStars={parseInt(comment.flavor)}
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
            {this.state.isAllComment === false
              ? "See All Reviews"
              : "See Few Reviews"}
          </Link>
        </div>
        <div className="bg-white rounded shadow-sm p-4 mb-5 rating-review-select-page">
          <h5 className="mb-4">Leave Comment</h5>
          <p className="mb-2">Rate the Place</p>
          <div className="mb-4">
            <div className="star-rating">
              <StarRating
                fontSize={26}
                star={5}
                handlePoint={this.HandlePoint}
              />
            </div>
          </div>

          <Form onSubmit={this.HandleSubmit}>
            <Form.Group>
              <Form.Label>Your Comment</Form.Label>
              <Form.Control
                as="textarea"
                value={this.state.newComment}
                name="newComment"
                id="newComment"
                onChange={this.HandleChange}
              />
            </Form.Group>
            <Form.Group>
              <Button variant="primary" size="sm" type="submit">
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
    currentUser: state.currentUserReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCustomerCommentLoad: bindActionCreators(
        commentActions.loadCustomerCommentsRequest,
        dispatch
      ),
      addCustomerComment: bindActionCreators(
        commentActions.addCustomerCommentRequest,
        dispatch
      ),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Comments);
