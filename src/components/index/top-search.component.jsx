import { Col, Container, Form, Row } from "react-bootstrap";
import { chooseCity, chooseCounty } from "../../redux/main/main.actions";
import {
  selectAreCitiesFetching,
  selectCities,
  selectCounties,
} from "../../redux/address/address.reselect";
import { selectCityId, selectCountyId } from "../../redux/main/main.reselect";

import Cuisines from "./cuisines.component";
import Icofont from "react-icofont";
import { Link } from "react-router-dom";
import MainPagesHelper from "../../helpers/mainPagesHelper";
import React from "react";
import Select2 from "react-select2-wrapper";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchCountiesStartAsync } from "../../redux/address/address.actions";

class TopSearch extends React.Component {
  HandleChange = (e) => {
    const { chooseCity, chooseCounty, loadCounties } = this.props;
    if (e.target.name === "city") {
      chooseCity(e.target.value);
      loadCounties(e.target.value);
    } else {
      chooseCounty(e.target.value);
    }
  };
  render() {
    const {
      cities,
      citiesAreFetching,
      cityId,
      counties,
      countyId,
    } = this.props;
    return (
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
                    Lists of top restaurants, cafes, pubs, and bars in
                    Melbourne, based on trends
                  </h5>
                </div>
                <div className="homepage-search-form">
                  <Form className="form-noborder">
                    <div className="form-row">
                      <Form.Group className="col-lg-5 col-md-5 col-sm-12">
                        <div className="location-dropdown">
                          <Icofont icon="location-arrow" />
                          <Select2
                            className="custom-select"
                            data={MainPagesHelper.FormatCities(cities)}
                            name="city"
                            value={cityId}
                            onChange={this.HandleChange}
                            options={{
                              placeholder: "Choose City",
                            }}
                          />
                        </div>
                      </Form.Group>
                      <Form.Group className="col-lg-5 col-md-5 col-sm-12">
                        <div className="location-dropdown">
                          <Icofont icon="location-arrow" />
                          <Select2
                            className="custom-select"
                            data={MainPagesHelper.FormatCities(counties)}
                            name="county"
                            value={countyId}
                            onChange={this.HandleChange}
                            options={{
                              placeholder: "Choose County",
                            }}
                          />
                        </div>
                      </Form.Group>
                      <Form.Group className="col-lg-2 col-md-2 col-sm-12">
                        <Link
                          to={cityId !== 0 ? "restaurants" : "#"}
                          className="btn btn-primary btn-block btn-lg btn-gradient"
                        >
                          Search
                        </Link>
                      </Form.Group>
                    </div>
                  </Form>
                </div>
                <Cuisines />
              </Col>
            </Row>
          </Container>
        </section>
      )
    );
  }
}
const mapStateToProps = createStructuredSelector({
  cities: selectCities,
  citiesAreFetching: selectAreCitiesFetching,
  cityId: selectCityId,
  counties: selectCounties,
  countyId: selectCountyId,
});
const mapDispatchToProps = (dispatch) => ({
  chooseCity: (cityId) => dispatch(chooseCity(cityId)),
  chooseCounty: (countyId) => dispatch(chooseCounty(countyId)),
  loadCounties: (cityId) => dispatch(fetchCountiesStartAsync(cityId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TopSearch);
