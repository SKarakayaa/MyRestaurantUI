import { addItem, clearItem, removeItem } from "../../redux/cart/cart.actions";

import { Button } from "react-bootstrap";
import Icofont from "react-icofont";
import React from "react";
import { connect } from "react-redux";
const CartSideCounterButtons = ({
  cartItem,
  addToCart,
  removeFromCart,
  clearItemFromCart,
}) => (
  <span className="count-number float-right">
    <Button
      variant="outline-secondary"
      onClick={() => removeFromCart(cartItem)}
      className="btn-sm left dec"
    >
      <Icofont icon="minus" />{" "}
    </Button>
    <input
      className="count-number-input"
      type="text"
      value={cartItem.quantity}
      readOnly
    />
    <Button
      variant="outline-secondary"
      onClick={() => addToCart(cartItem)}
      className="btn-sm right inc"
    >
      <Icofont icon="icofont-plus" />{" "}
    </Button>
    <Button
      variant="outline-secondary"
      onClick={() => clearItemFromCart(cartItem)}
      className="btn-sm right inc"
    >
      <Icofont icon="icofont-trash" />{" "}
    </Button>
  </span>
);
const mapDispatchToProps = (dispatch) => ({
  addToCart: (cartItem) => dispatch(addItem(cartItem)),
  removeFromCart: (cartItem) => dispatch(removeItem(cartItem)),
  clearItemFromCart: (cartItem) => dispatch(clearItem(cartItem)),
});
export default connect(null, mapDispatchToProps)(CartSideCounterButtons);
