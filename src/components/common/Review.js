import { Image, Media } from "react-bootstrap";
import React, { Component } from "react";

import Icofont from "react-icofont";
import IsLogin from "../Helper";
import { Link } from "react-router-dom";
import StarRating from "../common/StarRating";
import UpdateCommentModal from "../modals/UpdateCommentModal";
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
  render() {
    const { currentUser, ratingStars, comment } = this.props;
    console.log("star :", ratingStars);
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
              <Link className="total-like" to="#">
                <Icofont icon="thumbs-up" /> {this.props.likes}
              </Link>{" "}
              <Link className="total-like" to="#">
                <Icofont icon="thumbs-down" /> {this.props.dislikes}
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
                  </Link>&emsp;
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
export default connect(mapStateToProps)(Review);
