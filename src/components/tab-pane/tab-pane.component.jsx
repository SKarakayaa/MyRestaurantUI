import { Col, Container, Row, Tab } from "react-bootstrap";
import {
  fetchProductMaterialStartAsync,
  fetchProductStartAsync,
} from "../../redux/product/product.actions";

import CartSide from "../cart/cart-side.component";
import { CurrentCustomerId } from "../../componentsold/Helper";
import React from "react";
import TabBody from "./tab-body.component";
import TabHeader from "./tab-header.component";
import { connect } from "react-redux";
import { fetchCategoriesStartAsync } from "../../redux/category/category.actions";

class TabPane extends React.Component {
  componentDidMount() {
    const { loadCategories, loadProducts, loadProductMaterials } = this.props;
    loadCategories(CurrentCustomerId());
    loadProducts(CurrentCustomerId());
    loadProductMaterials(CurrentCustomerId());
  }
  render() {
    return (
      <Tab.Container defaultActiveKey="first">
        <section className="offer-dedicated-nav bg-white border-top-0 shadow-sm">
          <Container>
            <TabHeader />
          </Container>
        </section>
        <section className="offer-dedicated-body pt-2 pb-2 mt-4 mb-4">
          <Container>
            <Row>
              <Col md={8}>
                <TabBody />
              </Col>
              <Col md={4}>
                <CartSide />
              </Col>
            </Row>
          </Container>
        </section>
      </Tab.Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadCategories: (customerid) =>
    dispatch(fetchCategoriesStartAsync(customerid)),
  loadProducts: (customerid) => dispatch(fetchProductStartAsync(customerid)),
  loadProductMaterials: (customerid) =>
    dispatch(fetchProductMaterialStartAsync(customerid)),
});
export default connect(null, mapDispatchToProps)(TabPane);
