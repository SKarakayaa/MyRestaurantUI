import { Col, Container, Form, Row } from "react-bootstrap";
import {
  selectAreCitiesFetching,
  selectCities,
} from "../../redux/address/address.reselect";

import Icofont from "react-icofont";
import { Link } from "react-router-dom";
import MainPagesHelper from "../../helpers/mainPagesHelper";
import React from "react";
import Select2 from "react-select2-wrapper";
import { chooseCity } from "../../redux/main/main.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCityId, selectCuisinies } from "../../redux/main/main.reselect";
import Cuisines from "./cuisines.component";
class TopSearch extends React.Component {
  render() {
    const { cities, citiesAreFetching, cityId, chooseCity } = this.props;
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
                      <Form.Group className="col-lg-10 col-md-10 col-sm-12">
                        <div className="location-dropdown">
                          <Icofont icon="location-arrow" />
                          <Select2
                            className="custom-select"
                            data={MainPagesHelper.FormatCities(cities)}
                            value={cityId}
                            onChange={(e) => chooseCity(e.target.value)}
                            options={{
                              placeholder: "Quick Searches",
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
                {/* <CategoriesCarousel /> */}
              </Col>
              {/* <Col md={4}>
                <div className="osahan-slider pl-4 pt-3">
                  <OwlCarousel
                    nav
                    loop
                    {...options2}
                    className="homepage-ad owl-theme"
                  >
                    {cuisines.map((cuisine) => (
                      <CuisineItem title={cuisine.name} />
                    ))}
                  </OwlCarousel>
                </div>
              </Col> */}
            </Row>
          </Container>
        </section>
      )
    );
  }
}
const options2 = {
  responsive: {
    0: {
      items: 2,
    },
    764: {
      items: 2,
    },
    765: {
      items: 1,
    },
    1200: {
      items: 1,
    },
  },
  lazyLoad: true,
  loop: true,
  autoplay: true,
  autoplaySpeed: 1000,
  dots: false,
  autoplayTimeout: 2000,
  nav: true,
  navText: [
    "<i class='fa fa-chevron-left'></i>",
    "<i class='fa fa-chevron-right'></i>",
  ],
  autoplayHoverPause: true,
};
const mapStateToProps = createStructuredSelector({
  cities: selectCities,
  citiesAreFetching: selectAreCitiesFetching,
  cityId: selectCityId,
  cuisines: selectCuisinies,
});
const mapDispatchToProps = (dispatch) => ({
  chooseCity: (cityId) => dispatch(chooseCity(cityId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TopSearch);
