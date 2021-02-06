import { Col, Container, Dropdown, Row } from "react-bootstrap";
import {
  selectAreCustomersFetching,
  selectCustomers,
} from "../redux/main/main.reselect";

import CustomerItem from "../components/restaurants/customer-item.component";
import PageTitle from "../components/common/page-title.component";
import React from "react";
import Sidebar from "../components/restaurants/sidebar.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchCustomersStartAsync } from "../redux/main/main.actions";

class Restaurants extends React.Component {
  componentDidMount() {
    const { loadCustomers } = this.props;
    loadCustomers();
  }
  render() {
    const { customers, areCustomersFetching } = this.props;
    return (
      <>
        <PageTitle
          title="Offers Near You"
          subTitle="Best deals at your favourite restaurants"
        />
        <section className="section pt-5 pb-5 products-listing">
          <Container>
            <Row className="d-none-m">
              <Col md={12}>
                <Dropdown className="float-right">
                  <Dropdown.Toggle variant="outline-info">
                    Sort by: <span className="text-theme">Distance</span>{" "}
                    &nbsp;&nbsp;
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu-right shadow-sm border-0">
                    <Dropdown.Item href="#/distance">Distance</Dropdown.Item>
                    <Dropdown.Item href="#/no-of-coupons">
                      No Of Offers
                    </Dropdown.Item>
                    <Dropdown.Item href="#/rating">Rating</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <h4 className="font-weight-bold mt-0 mb-3">
                  OFFERS <small className="h6 mb-0 ml-2">299 restaurants</small>
                </h4>
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <Sidebar />
              </Col>
              <Col md={9}>
                {/* <CategoriesCarousel /> */}
                <Row>
                  {!areCustomersFetching &&
                    customers.map((customer) => (
                      <CustomerItem
                        customer={customer}
                        key={customer.frm_customer_id}
                      />
                    ))}
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  customers: selectCustomers,
  areCustomersFetching: selectAreCustomersFetching,
});
const mapDispatchToProps = (dispath) => ({
  loadCustomers: () => dispath(fetchCustomersStartAsync()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);
