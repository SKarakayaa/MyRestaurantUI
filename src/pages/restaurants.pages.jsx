import { Col, Container, Row } from "react-bootstrap";
import {
  selectAreCustomersFetching,
  selectCityId,
  selectCountyId,
  selectFileredCustomers,
} from "../redux/main/main.reselect";

import CustomerHelper from "../helpers/customerHelper";
import CustomerItem from "../components/restaurants/customer-item.component";
import PageTitle from "../components/common/page-title.component";
import React from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../components/restaurants/sidebar.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchAreasStartAsync } from "../redux/address/address.actions";

class Restaurants extends React.Component {
  state = {
    areaId: 0,
  };
  HandleChange = (e) => {
    const { name, value } = e.target;
    if (value !== "") this.setState({ [name]: value });
  };
  componentDidMount() {
    const { loadAreas, countyId } = this.props;
    loadAreas(countyId);
  }
  render() {
    const { cityId, countyId, areCustomersFetching, customers } = this.props;
    const { areaId } = this.state;
    const filteredCustomers =
      cityId !== 0 &&
      countyId !== 0 &&
      !areCustomersFetching &&
      CustomerHelper.FilterCustomer(areaId, customers);
    return cityId !== 0 && countyId !== 0 && !areCustomersFetching ? (
      <>
        <PageTitle
          title="Offers Near You"
          subTitle="Best deals at your favourite restaurants"
        />
        <section className="section pt-5 pb-5 products-listing">
          <Container>
            <Row className="d-none-m">
              <Col md={12}>
                <h4 className="font-weight-bold mt-0 mb-3">
                  Found{" "}
                  <small className="h6 mb-0 ml-2">
                    {filteredCustomers.length} Restaurants
                  </small>
                </h4>
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <Sidebar areaId={areaId} HandleChange={this.HandleChange} />
              </Col>
              <Col md={9}>
                <Row>
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                      <CustomerItem
                        customer={customer}
                        key={customer.frm_customer_id}
                      />
                    ))
                  ) : (
                    <h3>Any Restaurants Not Found !</h3>
                  )}
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    ) : (
      <Redirect to="/" />
    );
  }
}
const mapStateToProps = createStructuredSelector({
  customers: selectFileredCustomers,
  cityId: selectCityId,
  countyId: selectCountyId,
  areCustomersFetching: selectAreCustomersFetching,
});
const mapDispatchToProps = (dispatch) => ({
  loadAreas: (countyId) => dispatch(fetchAreasStartAsync(countyId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);
