import { Col, Container, Row } from "react-bootstrap";

import AuthHelper from "../helpers/authHelper";
import CartSide from "../components/cart/cart-side.component";
import CheckoutAddress from "../components/checkout/checkout-address.component";
import CheckoutPayment from "../components/checkout/checkout-payment.component";
import { CurrentCustomerId } from "../componentsold/Helper";
import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchCustomerInfoStartAsync } from "../redux/customer/customer.actions";
import { fetchPaymentMethodsStartAsync } from "../redux/order/order.actions";
import { fetchUserAddressesStartAsync } from "../redux/user/user.actions";
import { selectAreAddressesFetching } from "../redux/user/user.reselect";
import { selectAreFetchingPaymentMethods } from "../redux/order/order.reselect";
import { selectCustomerInfoIsFetching } from "../redux/customer/customer.reselect";
import { selectLoginCompleted } from "../redux/auth/auth.reselect";

class Checkout extends React.Component {
  componentDidMount() {
    const userid = AuthHelper.GetCurrentUser().userId;
    const { loadAddresses, loadPaymentMethods } = this.props;
    loadAddresses(CurrentCustomerId(), userid);
    loadPaymentMethods();
  }
  render() {
    const {
      loginCompleted,
      addressesAreFetching,
      customerInfoIsFetching,
      paymentMethodsAreFetching,
    } = this.props;
    return !loginCompleted ? (
      <Redirect to="/login" />
    ) : (
      <section className="offer-dedicated-body mt-4 mb-4 pt-2 pb-2">
        <Container>
          <Row>
            <Col md={8}>
              <div className="offer-dedicated-body-left">
                {/* <div className="bg-white rounded shadow-sm p-4 mb-4">
                  <h6 className="mb-3">You may also like</h6>
                  <ItemsCarousel />
                </div> */}

                <div className="pt-2"></div>
                {!addressesAreFetching && <CheckoutAddress />}

                <div className="pt-2"></div>
                {!customerInfoIsFetching && !paymentMethodsAreFetching && (
                  <CheckoutPayment />
                )}
              </div>
            </Col>
            <Col md={4}>
              <CartSide />
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  loginCompleted: selectLoginCompleted,
  addressesAreFetching: selectAreAddressesFetching,
  customerInfoIsFetching: selectCustomerInfoIsFetching,
  paymentMethodsAreFetching: selectAreFetchingPaymentMethods,
});
const mapDispatchToProps = (dispatch) => ({
  loadAddresses: (customerid, userid) =>
    dispatch(fetchUserAddressesStartAsync(customerid, userid)),
  loadCustomerInfo: (customerid) =>
    dispatch(fetchCustomerInfoStartAsync(customerid)),
  loadPaymentMethods: () => dispatch(fetchPaymentMethodsStartAsync()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
