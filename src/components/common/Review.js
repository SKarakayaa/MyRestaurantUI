import { Image, Media } from "react-bootstrap";
import React, { Component } from "react";

import Icofont from "react-icofont";
import IsLogin from "../Helper";
import { Link } from "react-router-dom";
import StarRating from "../common/StarRating";
import { connect } from "react-redux";

class Review extends Component {
  render() {
    const { currentUser } = this.props;
    
    return (
      <div className="reviews-members pt-4 pb-4">
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
              <p className="text-gray">{this.props.reviewDate}</p>
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
              {IsLogin() &&
              currentUser.session.userId === parseInt(this.props.userId) ? (
                <Link
                  to="#"
                  className="w-100 d-block mt-4 font-weight-bold ml-1"
                >
                  <i className="icofont-ui-edit"></i> Edit Comment
                </Link>
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
