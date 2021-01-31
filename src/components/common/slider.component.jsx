import * as customerStatus from "../../enums/CustomerStatusEnums";

import { Badge, Button, Col, Container, Image, Row } from "react-bootstrap";
import {
  selectCustomerComments,
  selectCustomerCommentsAreFetching,
} from "../../redux/comment/comment.reselect";
import {
  selectCustomerId,
  selectCustomerInfo,
  selectCustomerSlider,
  selectCustomerSliderIsFetching,
} from "../../redux/customer/customer.reselect";

import Icofont from "react-icofont";
import RatingAndReviewsHelper from "../../helpers/ratingAndReviewsHelper";
import React from "react";
import Translate from "../../utilities/translator";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchCustomerSliderStartAsync } from "../../redux/customer/customer.actions";

class Slider extends React.Component {
  componentDidMount() {
    const { loadCustomerSlider, customerId } = this.props;
    loadCustomerSlider(customerId);
  }
  render() {
    const {
      customerInfo,
      customerSlider,
      isSliderFetching,
      areCustomerCommentsFetching,
      customerComments,
    } = this.props;
    return (
      !isSliderFetching && (
        <section className="restaurant-detailed-banner">
          <div className="text-center">
            <Image
              fluid
              className="cover"
              src={`http://206.189.55.20:8080/preview/276ce05d-837b-4aa1-8f6f-ff02597a0e01/sf/x_file?_fai=${customerSlider.photo_path}`}
            />
          </div>
          <div className="restaurant-detailed-header">
            <Container>
              <Row className="d-flex align-items-end">
                <Col md={8}>
                  <div className="restaurant-detailed-header-left">
                    <Image
                      fluid
                      className="mr-3 float-left"
                      alt="osahan"
                      src={`http://206.189.55.20:8080/preview/276ce05d-837b-4aa1-8f6f-ff02597a0e01/sf/x_file?_fai=${customerInfo.sub_logo}`}
                    />
                    <h2 className="text-white">{customerInfo.name}</h2>
                    <p className="text-white mb-2">
                      <Icofont icon="location-pin" />{" "}
                      {customerInfo.customer_location}
                      {customerInfo.customer_status === customerStatus.OPEN ? (
                        <Badge variant="success">
                          <Translate >OPEN</Translate>{" "}
                        </Badge>
                      ) : (
                        <Badge variant="danger">
                          {" "}
                          <Translate >CLOSE</Translate>{" "}
                        </Badge>
                      )}
                    </p>
                    <p className="text-white mb-0">
                      <Icofont icon="food-cart" /> {customerInfo.meta_data}
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="restaurant-detailed-header-right text-right">
                    <Button variant="success" type="button">
                      <Icofont icon="clock-time" /> {customerInfo.order_time}
                    </Button>
                    {!areCustomerCommentsFetching && (
                      <h6 className="text-white mb-0 restaurant-detailed-ratings">
                        <span className="generator-bg rounded text-white">
                          <Icofont icon="star" />{" "}
                          {RatingAndReviewsHelper.CalculateAvaragePoint(
                            customerComments
                          )}
                        </span>
                        {customerComments.length}{" "}
                        <Translate >Ratings</Translate>
                        <Icofont icon="speech-comments" className="ml-3" />{" "}
                        {customerComments.length}{" "}
                        <Translate >Reviews</Translate>
                      </h6>
                    )}
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </section>
      )
    );
  }
}
const mapStateToProps = createStructuredSelector({
  customerInfo: selectCustomerInfo,
  isSliderFetching: selectCustomerSliderIsFetching,
  customerSlider: selectCustomerSlider,
  areCustomerCommentsFetching: selectCustomerCommentsAreFetching,
  customerComments: selectCustomerComments,
  customerId: selectCustomerId,
});
const mapDispatchToProps = (dispatch) => ({
  loadCustomerSlider: (customerid) =>
    dispatch(fetchCustomerSliderStartAsync(customerid)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Slider);
