import { Container, Row } from "react-bootstrap";
import {
  selectIsOrderCreated,
  selectOrderErrorMessage,
} from "../redux/order/order.reselect";

import FailOrder from "../components/thanks/fail-order.component";
import React from "react";
import { Redirect } from "react-router-dom";
import SuccessOrder from "../components/thanks/success-order.component";
import { clearCart } from "../redux/cart/cart.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

class Thanks extends React.Component {
  componentDidMount() {
    const { orderErrorMessage, clearCart } = this.props;
    if (orderErrorMessage === null) {
      clearCart();
    }
  }
  render() {
    const { isOrderCreated, orderErrorMessage } = this.props;
    return isOrderCreated ? (
      <section className="section pt-5 pb-5 osahan-not-found-page">
        <Container>
          <Row>
            {orderErrorMessage === null ? (
              <SuccessOrder />
            ) : (
              <FailOrder orderErrorMessage={orderErrorMessage} />
            )}
          </Row>
        </Container>
      </section>
    ) : (
      <Redirect to="/" />
    );
  }
}
const mapStateToProps = createStructuredSelector({
  isOrderCreated: selectIsOrderCreated,
  orderErrorMessage: selectOrderErrorMessage,
});
const mapDispatchToProps = (dispatch) => ({
  clearCart: () => dispatch(clearCart()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Thanks);
