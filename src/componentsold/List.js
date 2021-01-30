import * as homepageActions from "../redux/actions/homepageActions";

import { Col, Container, Dropdown, Row } from "react-bootstrap";

import CustomerItem from "./common/CustomerItem";
import PageTitle from "./common/PageTitle";
import React from "react";
import Sidebar from "./home/Sidebar";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class List extends React.Component {
  componentDidMount() {
    const { customers, cuisines, actions } = this.props;
    if (customers.length === 0) {
      actions.loadCustomers();
    }
    if (cuisines.length === 0) {
      actions.loadCuisines();
    }
  }
  GetCustomerCuisines = (cuisineIds) => {
    const { cuisines } = this.props;
    if (cuisineIds !== "") {
      let cuisinesIdArray = cuisineIds.split(",");
      let cuisineStrings = "";

      cuisinesIdArray.forEach((cuisineId) => {
        let cuisine = cuisines.find((x) => x.all_cuisines_id === cuisineId);
        cuisineStrings +=
          cuisine !== undefined && cuisine !== null ? cuisine.name + "•" : "";
      });
      return cuisineStrings;
    } else {
      return "";
    }
  };
  render() {
    const { customers } = this.props;
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
                  {customers.map((customer) => (
                    <Col
                      md={4}
                      sm={6}
                      className="mb-4 pb-2"
                      key={customer.frm_customer_id}
                    >
                      <CustomerItem
                        title={customer.name}
                        subTitle={this.GetCustomerCuisines(customer.cuisines)}
                        imageAlt="Product"
                        image="img/list/1.png"
                        imageClass="img-fluid item-img"
                        linkUrl={`detail/${customer.frm_customer_id}`}
                        time={customer.order_time}
                      />
                    </Col>
                  ))}

                  {/* <Col md={12} className="text-center load-more">
                    <Button variant="primary" type="button" disabled="">
                      <Spinner animation="grow" size="sm" className="mr-1" />
                      Loading...
                    </Button>
                  </Col> */}
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    customers: state.homepageReducer,
    cuisines: state.cuisineReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCustomers: bindActionCreators(
        homepageActions.loadCustomerListRequest,
        dispatch
      ),
      loadCuisines: bindActionCreators(
        homepageActions.loadCuisinesRequest,
        dispatch
      ),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(List);
