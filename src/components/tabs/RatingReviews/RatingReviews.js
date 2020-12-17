import * as commentActions from "../../../redux/actions/commentActions";

import React, { Component, Fragment } from "react";

import Comments from "./Comments";
import { CurrentCustomerId } from "../../Helper";
import RatingBar from "../../common/RatingBar";
import StarRating from "../../common/StarRating";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class RatingReviews extends Component {
  componentDidMount() {
    if (this.props.customerComments.length === 0) {
      this.props.actions.loadCustomerComments(CurrentCustomerId());
    }
  }
  GetStarCountByPointValue = (point) => {
    let count = this.props.customerComments.filter(
      (x) => parseInt(x.flavor) === point
    ).length;
    return count;
  };
  CalculateAvaragePoint = () => {
    const { customerComments } = this.props;
    let totalPoint = 0;
    let avg = 0;
    customerComments.forEach((comment) => {
      totalPoint += parseInt(comment.flavor);
    });
    avg = totalPoint / customerComments.length;
    return avg.toFixed(2);
  };
  render() {
    const { customerComments } = this.props;
    let avaragePoint =
      customerComments.length !== 0 ? this.CalculateAvaragePoint() : 0;
    let ceiledPoint = Math.ceil(avaragePoint);
    return (
      <Fragment>
        {/* <div
          id="ratings-and-reviews"
          className="bg-white rounded shadow-sm p-4 mb-4 clearfix restaurant-detailed-star-rating"
        >
          <div className="star-rating float-right">
            <StarRating fontSize={26} star={5} />
          </div>
          <h5 className="mb-0 pt-1">Rate this Place</h5>
        </div> */}
        <div className="bg-white rounded shadow-sm p-4 mb-4 clearfix graph-star-rating">
          <h5 className="mb-0 mb-4">Ratings and Reviews</h5>
          <div className="graph-star-rating-header">
            <div className="star-rating">
              {ceiledPoint !== 0 ? (
                <StarRating fontSize={18} disabled={true} star={ceiledPoint} />
              ) : null}

              <b className="text-black ml-2">{customerComments.length}</b>
            </div>
            <p className="text-black mb-4 mt-2">
              Rated {avaragePoint} out of 5
            </p>
          </div>
          <div className="graph-star-rating-body">
            <RatingBar
              leftText="5 Star"
              barValue={this.GetStarCountByPointValue(5)}
            />
            <RatingBar
              leftText="4 Star"
              barValue={this.GetStarCountByPointValue(4)}
            />
            <RatingBar
              leftText="3 Star"
              barValue={this.GetStarCountByPointValue(3)}
            />
            <RatingBar
              leftText="2 Star"
              barValue={this.GetStarCountByPointValue(2)}
            />
            <RatingBar
              leftText="1 Star"
              barValue={this.GetStarCountByPointValue(1)}
            />
          </div>
          {/* <div className="graph-star-rating-footer text-center mt-3 mb-3">
            <Button type="button" variant="outline-primary" size="sm">
              Rate and Review
            </Button>
          </div> */}
        </div>
        <Comments />
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
      loadCustomerComments: bindActionCreators(
        commentActions.loadCustomerCommentsRequest,
        dispatch
      ),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(RatingReviews);
