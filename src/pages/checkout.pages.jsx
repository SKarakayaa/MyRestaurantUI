import { Col, Container, Row } from "react-bootstrap";
import {
  fetchCustomerInfoStartAsync,
  fetchPriceOfAreasStartAsync,
} from "../redux/customer/customer.actions";
import {
  selectAreFetchingPaymentMethods,
  selectChoosedAddress,
  selectChoosedPaymentMethodId,
} from "../redux/order/order.reselect";
import {
  selectAreFetchingPriceOfAreas,
  selectCustomerId,
} from "../redux/customer/customer.reselect";
import {
  selectCartItems,
  selectCartItemsCount,
  selectCartTotal,
} from "../redux/cart/cart.reselect";

import AuthHelper from "../helpers/authHelper";
import CartSide from "../components/cart/cart-side.component";
import CheckoutAddress from "../components/checkout/checkout-address.component";
import CheckoutPayment from "../components/checkout/checkout-payment.component";
import OrderHelper from "../helpers/orderHelper";
import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createOrder } from "../redux/order/order.actions";
import { createStructuredSelector } from "reselect";
import { fetchPaymentMethodsStartAsync } from "../redux/order/order.actions";
import { fetchUserAddressesStartAsync } from "../redux/user/user.actions";
import { selectAreAddressesFetching } from "../redux/user/user.reselect";
import { selectCustomerInfoIsFetching } from "../redux/customer/customer.reselect";
import { selectLoginCompleted } from "../redux/auth/auth.reselect";

class Checkout extends React.Component {
  state = {
    orderValidation: "",
  };
  componentDidMount() {
    const userid = AuthHelper.GetCurrentUser().userId;
    const {
      loadPriceOfAreas,
      loadAddresses,
      loadPaymentMethods,
      customerid,
    } = this.props;
    loadAddresses(userid);
    loadPaymentMethods();
    loadPriceOfAreas(customerid);
  }
  CreateOrder = () => {
    const {
      cartItems,
      cartTotal,
      cartItemsCount,
      choosedAddress,
      choosedPaymentMethodId,
      createOrder,
      customerid,
      history,
    } = this.props;
    const validation = OrderHelper.OrderValidation(
      cartItemsCount,
      choosedAddress,
      choosedPaymentMethodId
    );
    if (validation.isValid) {
      const order = {
        user_id: AuthHelper.GetCurrentUser().userId,
        address_id: choosedAddress.frm_user_adress_id,
        payment_methods: choosedPaymentMethodId,
        total_price: cartTotal,
        channel_type_id: 1,
        customer_id: customerid,
        order_status_id: 1,
        order_date: new Date(),
      };
      createOrder(order, cartItems);
      history.push("/thanks");
    } else {
      this.setState({ orderValidation: validation.validMessage });
    }
  };

  render() {
    const {
      loginCompleted,
      addressesAreFetching,
      customerInfoIsFetching,
      paymentMethodsAreFetching,
      areFetchingPriceOfAreas,
      cartItemsCount
    } = this.props;
    return !loginCompleted || cartItemsCount === 0 ? (
      <Redirect to="/login" />
    ) : (
      <section className="offer-dedicated-body mt-4 mb-4 pt-2 pb-2">
        <Container>
          <Row>
            <Col md={8}>
              <h4 style={{ color: "red" }}>{this.state.orderValidation}</h4>
              <div className="offer-dedicated-body-left">
                <div className="pt-2"></div>
                {!addressesAreFetching && !areFetchingPriceOfAreas && (
                  <CheckoutAddress />
                )}

                <div className="pt-2"></div>
                {!customerInfoIsFetching && !paymentMethodsAreFetching && (
                  <CheckoutPayment CreateOrder={this.CreateOrder} />
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
  cartItems: selectCartItems,
  cartItemsCount: selectCartItemsCount,
  choosedAddress: selectChoosedAddress,
  choosedPaymentMethodId: selectChoosedPaymentMethodId,
  cartTotal: selectCartTotal,
  customerid: selectCustomerId,
  areFetchingPriceOfAreas: selectAreFetchingPriceOfAreas,
});
const mapDispatchToProps = (dispatch) => ({
  loadAddresses: (userid) => dispatch(fetchUserAddressesStartAsync(userid)),
  loadCustomerInfo: (customerid) =>
    dispatch(fetchCustomerInfoStartAsync(customerid)),
  loadPaymentMethods: () => dispatch(fetchPaymentMethodsStartAsync()),
  createOrder: (order, cart) => dispatch(createOrder(order, cart)),
  loadPriceOfAreas: (customerid) =>
    dispatch(fetchPriceOfAreasStartAsync(customerid)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
