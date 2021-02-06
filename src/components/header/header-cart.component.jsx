import {
  selectCartItems,
  selectCartItemsCount,
  selectCartTotal,
} from "../../redux/cart/cart.reselect";

import CartHeader from "../cart/cart-header.component";
import DropDownTitle from "../common/dropdown-title.component";
import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import React from "react";
import Translate from "../../utilities/translator";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCustomerInfo } from "../../redux/customer/customer.reselect";

const HeaderCart = ({ cartCount, cartItems, cartTotal, customerInfo }) => (
  <NavDropdown
    activeclassname="active"
    alignRight
    className="dropdown-cart"
    title={
      <DropDownTitle
        className="d-inline-block"
        faIcon="shopping-basket"
        iconClass="mr-1"
        title={<Translate>Cart</Translate>}
        badgeClass="ml-1"
        badgeVariant="success"
        badgeValue={cartCount}
      />
    }
  >
    <div className="dropdown-cart-top shadow-sm">
      <div className="dropdown-cart-top-body border-top p-4">
        {cartCount !== 0 ? (
          cartItems.map((cartItem) => (
            <CartHeader key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <Translate>Cart is Empty</Translate>
        )}
      </div>
      <div className="dropdown-cart-top-footer border-top p-4">
        <p className="mb-0 font-weight-bold text-secondary">
          <Translate>Sub Total</Translate>
          <span className="float-right text-dark">
            {cartTotal} {customerInfo.currency_unit}
          </span>
        </p>
        <small className="text-info">
          <Translate>Extra charges may apply</Translate>
        </small>
      </div>
      <div className="dropdown-cart-top-footer border-top p-2">
        <NavDropdown.Item
          eventKey={5.1}
          as={Link}
          className="btn btn-success btn-block py-3 text-white text-center dropdown-item"
          to="/checkout"
        >
          <Translate>Checkout</Translate>
        </NavDropdown.Item>
      </div>
    </div>
  </NavDropdown>
);
const mapStateToProps = createStructuredSelector({
  cartCount: selectCartItemsCount,
  cartTotal: selectCartTotal,
  cartItems: selectCartItems,
  customerInfo: selectCustomerInfo,
});
export default connect(mapStateToProps)(HeaderCart);
