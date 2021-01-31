import { Fragment } from "react";
import RatingAndReviewsHelper from "../../helpers/ratingAndReviewsHelper";
import RatingBar from "./rating-bar.component";
import React from "react";
import StarRating from "./star-rating.component";
import Translate from "../../utilities/translator";
import {TranslatePlaceholder} from '../../utilities/translator-placeholder'
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCustomerComments } from "../../redux/comment/comment.reselect";

const Ratings = ({ customerComments }) => {
  const avaragePoint = RatingAndReviewsHelper.CalculateAvaragePoint(
    customerComments
  );
  const ceiledPoint = Math.ceil(avaragePoint);
  const pointArray = [5, 4, 3, 2, 1];
  return (
    <Fragment>
      <h5 className="mb-0 mb-4">
        <Translate>Ratings & Reviews</Translate>
      </h5>
      <div className="graph-star-rating-header">
        <div className="star-rating">
          <StarRating fontSize={18} disabled={true} star={ceiledPoint} />
          <b className="text-black ml-2">{customerComments.length}</b>
        </div>
        {/* <p className="text-black mb-4 mt-2">Rated {avaragePoint} out of 5</p> */}
        <p className="text-black mb-4 mt-2">5 üzerinden {avaragePoint} Oylandı</p>
      </div>
      <div className="graph-star-rating-body">
        {pointArray.map((point) => (
          <RatingBar
            key={point}
            leftText={point + " " +TranslatePlaceholder("Stars")}
            barValue={RatingAndReviewsHelper.GetStarCountByPointValue(
              customerComments,
              point
            )}
          />
        ))}
      </div>
    </Fragment>
  );
};
const mapStateToProps = createStructuredSelector({
  customerComments: selectCustomerComments,
});
export default connect(mapStateToProps)(Ratings);
