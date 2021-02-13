import { Col, Container, Row } from "react-bootstrap";
import {
  fetchCuisinesStartAsync,
  fetchCustomersStartAsync,
} from "../redux/main/main.actions";
import {
  selectAreCuisiniesFetching,
  selectAreCustomersFetching,
} from "../redux/main/main.reselect";

import FontAwesome from "../components/common/fontawesome.component";
import { Link } from "react-router-dom";
import PopularFirms from "../components/index/popular-firms.component";
import React from "react";
import SectionHeading from "../components/common/section-heading.component";
import SpecialFirms from "../components/index/special-firms.component";
import TopSearch from "../components/index/top-search.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

class Index extends React.Component {
  componentDidMount() {
    const { loadCuisines, loadCustomers } = this.props;
    loadCustomers();
    loadCuisines();
  }
  render() {
    const { areCuisinesFetching, areCustomerFetching } = this.props;
    return (
      <>
        {!areCuisinesFetching && <TopSearch />}
        {!areCustomerFetching && (
          <>
            <SpecialFirms />
            <PopularFirms />
          </>
        )}
        <section className="section pt-5 pb-5 bg-white becomemember-section border-bottom">
          <Container>
            <SectionHeading
              heading="Become a Member"
              subHeading="Lorem Ipsum is simply dummy text of"
            />
            <Row>
              <Col sm={12} className="text-center">
                <Link to="register" className="btn btn-success btn-lg">
                  Create an Account <FontAwesome icon="chevron-circle-right" />
                </Link>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  areCuisinesFetching: selectAreCuisiniesFetching,
  areCustomerFetching: selectAreCustomersFetching,
});
const mapDispatchToProps = (dispatch) => ({
  loadCuisines: () => dispatch(fetchCuisinesStartAsync()),
  loadCustomers: () => dispatch(fetchCustomersStartAsync()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Index);
