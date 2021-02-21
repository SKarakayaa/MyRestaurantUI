import { Col, Container, Row } from "react-bootstrap";

import AuthHelper from "../../helpers/authHelper";
import ChooseAddress from "./choose-address.component";
import Cuisines from "./cuisines.component";
import React from "react";
import SearchAddress from "./search-address.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectAreCitiesFetching } from "../../redux/address/address.reselect";

const TopSearch = ({ citiesAreFetching,history }) =>
  !citiesAreFetching && (
    <section className="pt-5 pb-5 homepage-search-block position-relative">
      <div className="banner-overlay"></div>
      <Container>
        <Row className="d-flex align-items-center">
          <Col md={8}>
            <div className="homepage-search-title">
              <h1 className="mb-2 font-weight-normal">
                <span className="font-weight-bold">Find Awesome Deals</span>
              </h1>
              <h5 className="mb-5 text-secondary font-weight-normal">
                Lists of top restaurants, cafes, pubs, and bars in Melbourne,
                based on trends
              </h5>
            </div>
            <div className="homepage-search-form">
              {AuthHelper.IsLogin() ? (
                <ChooseAddress history={history}/>
              ) : (
                <SearchAddress />
              )}

              {/*  */}
            </div>
            <Cuisines />
          </Col>
        </Row>
      </Container>
    </section>
  );
const mapStateToProps = createStructuredSelector({
  citiesAreFetching: selectAreCitiesFetching,
});
export default connect(mapStateToProps)(TopSearch);
