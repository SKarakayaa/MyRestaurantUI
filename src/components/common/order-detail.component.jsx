import { Col, Container, Row } from "react-bootstrap";

import AddressHelper from "../../helpers/addressHelper";
import CartDropdownItem from "../../componentsold/cart/CartDropdownItem";
import Icofont from "react-icofont";
import { Link } from "react-router-dom";
import OrderHelper from "../../helpers/orderHelper";
import ProductHelper from "../../helpers/productHelper";
import React from "react";
import { connect } from "react-redux";
import { selectCustomerInfo } from "../../redux/customer/customer.reselect";
import { selectPaymentMethod } from "../../redux/order/order.reselect";
import { selectProducts } from "../../redux/product/product.reselect";
import { selectUserAddress } from "../../redux/user/user.reselect";

const OrderDetail = ({
  lastOrder,
  customerInfo,
  userAdress,
  products,
  paymentMethod,
}) => (
  <Container className="pt-1 pb-1">
    <Row className="d-flex align-items-center">
      <Col md={12}>
        <div className="bg-white p-4 shadow-lg mb-2">
          <h6 className="mb-1 mt-1">
            <Link to="/detail" className="text-black">
              {customerInfo.name}
            </Link>
          </h6>
          <p className="text-gray mb-0">
            <Icofont icon="clock-time" />{" "}
            {OrderHelper.LastOrderItemCount(lastOrder.orderDetail)} Items |{" "}
            {OrderHelper.LastOrderTotalBill(lastOrder.orderDetail)}{" "}
            {customerInfo.currency_unit}
          </p>
        </div>
        <div className="bg-white p-4 shadow-lg">
          <div className="osahan-track-order-detail po">
            <h5 className="mt-0 mb-3">Order Details</h5>
            <Row>
              <Col md={5}>
                <small>FROM</small>
                <h6 className="mb-1 mt-1">
                  <Link to="/detail" className="text-black">
                    <Icofont icon="food-cart" /> {customerInfo.name}
                  </Link>
                </h6>
                <p className="text-gray mb-5">
                  {customerInfo.customer_other_address}
                </p>
                <small>DELIVER TO</small>
                <h6 className="mb-1 mt-1">
                  <span className="text-black">
                    <Icofont icon="map-pins" />{" "}
                    {AddressHelper.GetAddressTypeName(userAdress.address_type)}
                  </span>
                </h6>
                <p className="text-gray mb-0">
                  {userAdress.delivery_area +
                    " - " +
                    userAdress.delivery_instructions +
                    " - " +
                    userAdress.location}
                </p>
              </Col>
              <Col md={7}>
                <div className="mb-2">
                  <small>
                    <Icofont icon="list" />{" "}
                    {OrderHelper.LastOrderItemCount(lastOrder.orderDetail)}{" "}
                    Items
                  </small>
                </div>
                {lastOrder.orderDetail.map((orderItem) => {
                  let product = ProductHelper.GetProduct(
                    products,
                    orderItem.frm_product_id
                  );
                  return (
                    <CartDropdownItem
                      icoIcon="ui-press"
                      iconClass="text-danger food-item"
                      title={orderItem.quantity + "x" + product.name}
                      price={
                        orderItem.quantity * orderItem.price +
                        " " +
                        customerInfo.currency_unit
                      }
                    />
                  );
                })}

                <hr />
                <p className="mb-0 font-weight-bold text-black">
                  TOTAL BILL{" "}
                  <span className="float-right text-secondary">
                    {OrderHelper.LastOrderTotalBill(lastOrder.orderDetail)}{" "}
                    {customerInfo.currency_unit}
                  </span>
                </p>
                <p className="mb-0 text-info">
                  <small>Paying via {paymentMethod.name}</small>
                </p>
              </Col>
            </Row>
          </div>
        </div>
        <div className="bg-white p-4 shadow-lg mt-2">
          <Row className="text-center">
            <Col>
              <Icofont icon="tasks" className="icofont-3x text-info" />
              <p className="mt-1 font-weight-bold text-dark mb-0">
                Order Received
              </p>
              <small className="text-info mb-0">NOW</small>
            </Col>
            <Col>
              <Icofont
                icon="check-circled"
                className="icofont-3x text-success"
              />
              <p className="mt-1 font-weight-bold text-dark mb-0">
                Order Confirmed
              </p>
              <small className="text-success mb-0">NEXT</small>
            </Col>
            <Col>
              <Icofont
                icon="delivery-time"
                className="icofont-3x text-primary"
              />
              <p className="mt-1 font-weight-bold text-dark mb-0">
                Order Picked Up
              </p>
              <small className="text-primary mb-0">LATER (ET : 30min)</small>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  </Container>
);
const mapStateToProps = (state, ownProps) => ({
  customerInfo: selectCustomerInfo(state),
  userAdress: selectUserAddress(ownProps.lastOrder.order.address_id)(state),
  products: selectProducts(state),
  paymentMethod: selectPaymentMethod(ownProps.lastOrder.order.payment_methods)(
    state
  ),
});
export default connect(mapStateToProps)(OrderDetail);
