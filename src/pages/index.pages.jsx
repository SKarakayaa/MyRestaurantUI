import { Col, Container, Row } from "react-bootstrap";
import {
  fetchCuisinesStartAsync,
  fetchCustomersStartAsync,
  resetMain,
} from "../redux/main/main.actions";
import {
  selectAreCuisiniesFetching,
  selectAreCustomersFetching,
} from "../redux/main/main.reselect";

import AuthHelper from "../helpers/authHelper";
import FontAwesome from "../components/common/fontawesome.component";
import { Link } from "react-router-dom";
import PopularFirms from "../components/index/popular-firms.component";
import React from "react";
import SectionHeading from "../components/common/section-heading.component";
import SpecialFirms from "../components/index/special-firms.component";
import TopSearch from "../components/index/top-search.component";
import Translate from "../utilities/translator";
import { TranslatePlaceholder } from "../utilities/translator-placeholder";
import { changeCustomerIdAsync } from "../redux/customer/customer.actions";
import { clearCart } from "../redux/cart/cart.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { resetAddressFetch } from "../redux/address/address.actions";
import { resetCategories } from "../redux/category/category.actions";
import { resetOrders } from "../redux/order/order.actions";
import { resetProducts } from "../redux/product/product.actions";
import { selectChoosedAddress } from "../redux/order/order.reselect";

class Index extends React.Component {
  componentDidMount() {
    const {
      loadCuisines,
      loadCustomers,
      changeCustomerId,
      resetAddressFetch,
      clearCart,
      resetProducts,
      resetCategories,
      resetMain,
      resetOrders
    } = this.props;
    if (AuthHelper.IsLogin()) {
      resetAddressFetch();
    }
    resetProducts();
    resetCategories();
    clearCart();
    changeCustomerId();
    resetMain();
    resetOrders();

    loadCustomers();
    loadCuisines();
  }
  render() {
    const { areCuisinesFetching, areCustomerFetching, history } = this.props;
    return (
      <>
        {!areCuisinesFetching && <TopSearch history={history} />}
        {!areCustomerFetching && (
          <>
            <SpecialFirms />
            <PopularFirms />
          </>
        )}
        <section className="section pt-5 pb-5 bg-white becomemember-section border-bottom">
          <Container>
            <SectionHeading heading={TranslatePlaceholder("Become a Member")} />
            <Row>
              <Col sm={12} className="text-center">
                <Link to="register" className="btn btn-success btn-lg">
                  <Translate>Create an Account</Translate>{" "}
                  <FontAwesome icon="chevron-circle-right" />
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
  choosedAddress: selectChoosedAddress,
});
const mapDispatchToProps = (dispatch) => ({
  loadCuisines: () => dispatch(fetchCuisinesStartAsync()),
  loadCustomers: () => dispatch(fetchCustomersStartAsync()),
  changeCustomerId: () => dispatch(changeCustomerIdAsync(null)),
  resetAddressFetch: () => dispatch(resetAddressFetch()),
  clearCart: () => dispatch(clearCart()),
  resetProducts: () => dispatch(resetProducts()),
  resetCategories: () => dispatch(resetCategories()),
  resetMain: () => dispatch(resetMain()),
  resetOrders: () => dispatch(resetOrders()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Index);
