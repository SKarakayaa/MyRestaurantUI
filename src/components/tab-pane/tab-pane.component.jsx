import { Col, Container, Row, Tab } from "react-bootstrap";
import {
  fetchProductMaterialStartAsync,
  fetchProductStartAsync,
} from "../../redux/product/product.actions";

import AuthHelper from "../../helpers/authHelper";
import CartSide from "../cart/cart-side.component";
import React from "react";
import TabBody from "./tab-body.component";
import TabHeader from "./tab-header.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchCategoriesStartAsync } from "../../redux/category/category.actions";
import { fetchFavoriteProductsStartAsync } from "../../redux/user/user.actions";
import { selectCustomerId } from "../../redux/customer/customer.reselect";

class TabPane extends React.Component {
  componentDidMount() {
    const {
      customerId,
      loadCategories,
      loadProducts,
      loadProductMaterials,
      loadFavoriteProducts,
    } = this.props;
    loadCategories(customerId);
    loadProducts(customerId);
    loadProductMaterials(customerId);
    if (AuthHelper.IsLogin()) {
      loadFavoriteProducts(AuthHelper.GetCurrentUser().userId, customerId);
    }
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
const mapStateToProps = createStructuredSelector({
  customerId: selectCustomerId,
});
const mapDispatchToProps = (dispatch) => ({
  loadCategories: (customerid) =>
    dispatch(fetchCategoriesStartAsync(customerid)),
  loadProducts: (customerid) => dispatch(fetchProductStartAsync(customerid)),
  loadProductMaterials: (customerid) =>
    dispatch(fetchProductMaterialStartAsync(customerid)),
  loadFavoriteProducts: (userid, customerid) =>
    dispatch(fetchFavoriteProductsStartAsync(userid, customerid)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TabPane);
