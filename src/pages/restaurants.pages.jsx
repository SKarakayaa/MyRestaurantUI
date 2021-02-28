import { Col, Container, Row } from "react-bootstrap";
import {
  selectAreCustomersFetching,
  selectCityId,
  selectCountyId,
  selectFileredCustomers,
} from "../redux/main/main.reselect";

import CustomerHelper from "../helpers/customerHelper";
import CustomerItem from "../components/restaurants/customer-item.component";
import FailOrder from "../components/thanks/fail-order.component";
import PageTitle from "../components/common/page-title.component";
import React from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../components/restaurants/sidebar.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchAreasStartAsync } from "../redux/address/address.actions";
import { selectAreAreasFetching } from "../redux/address/address.reselect";

class Restaurants extends React.Component {
  state = {
    areaId: 0,
    checkedCuisines: [],
    destinyId: 0,
    orderTime: "",
  };
  HandleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "checkbox") {
      if (name === "cuisine") {
        var found = this.state.checkedCuisines.find(
          (x) => x === e.target.value
        );
        if (found) {
          const newCheckedCuisines = this.state.checkedCuisines.filter(
            (x) => x !== value
          );
          this.setState(
            { checkedCuisines: newCheckedCuisines },
            console.log(this.state.checkedCuisines)
          );
        } else {
          this.setState({
            checkedCuisines: [...this.state.checkedCuisines, value],
          });
        }
      }
      if (name === "destiny") {
        this.setState({ destinyId: value });
      }
      if (name === "orderTime") {
        if (this.state.orderTime === value) {
          this.setState({ orderTime: "" });
        } else {
          this.setState({ orderTime: value });
        }
      }
    } else {
      if (value !== "") this.setState({ [name]: value });
    }
  };
  componentDidMount() {
    const { loadAreas, countyId } = this.props;
    loadAreas(countyId);
  }
  render() {
    const {
      cityId,
      countyId,
      areCustomersFetching,
      customers,
      areAreasFetching,
    } = this.props;
    const { areaId, destinyId, checkedCuisines, orderTime } = this.state;
    const filteredCustomers =
      cityId !== 0 &&
      countyId !== 0 &&
      !areCustomersFetching &&
      CustomerHelper.FilterCustomer(
        areaId,
        destinyId,
        orderTime,
        checkedCuisines,
        customers
      );
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
              {!areAreasFetching && (
                <Col md={3}>
                  <Sidebar
                    areaId={areaId}
                    destinyId={destinyId}
                    HandleChange={this.HandleChange}
                    checkedCuisines={checkedCuisines}
                    orderTime={orderTime}
                  />
                </Col>
              )}
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
                    <FailOrder
                      orderErrorMessage="Any Restaurants Not Found !"
                      errorHeader="Not Found"
                    />
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
  areAreasFetching: selectAreAreasFetching,
});
const mapDispatchToProps = (dispatch) => ({
  loadAreas: (countyId) => dispatch(fetchAreasStartAsync(countyId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);
