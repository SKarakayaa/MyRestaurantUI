import React, { Component, Fragment } from "react";

import { Button } from "react-bootstrap";
import Comments from "./Comments";
import RatingBar from "../../common/RatingBar";
import StarRating from "../../common/StarRating";

class RatingReviews extends Component {
 
  render() {
    return (
      <Fragment>
        <div
          id="ratings-and-reviews"
          className="bg-white rounded shadow-sm p-4 mb-4 clearfix restaurant-detailed-star-rating"
        >
          <div className="star-rating float-right">
            <StarRating fontSize={26} star={5} />
          </div>
          <h5 className="mb-0 pt-1">Rate this Place</h5>
        </div>
        <div className="bg-white rounded shadow-sm p-4 mb-4 clearfix graph-star-rating">
          <h5 className="mb-0 mb-4">Ratings and Reviews</h5>
          <div className="graph-star-rating-header">
            <div className="star-rating">
              <StarRating fontSize={18} disabled={true} star={5} />
              <b className="text-black ml-2">334</b>
            </div>
            <p className="text-black mb-4 mt-2">Rated 3.5 out of 5</p>
          </div>
          <div className="graph-star-rating-body">
            <RatingBar leftText="5 Star" barValue={56} />
            <RatingBar leftText="4 Star" barValue={23} />
            <RatingBar leftText="3 Star" barValue={11} />
            <RatingBar leftText="2 Star" barValue={6} />
            <RatingBar leftText="1 Star" barValue={4} />
          </div>
          <div className="graph-star-rating-footer text-center mt-3 mb-3">
            <Button type="button" variant="outline-primary" size="sm">
              Rate and Review
            </Button>
          </div>
        </div>
        <Comments />
      </Fragment>
    );
  }
}
export default RatingReviews;
