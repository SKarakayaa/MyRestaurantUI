import Icofont from "react-icofont";
import React from "react";

const CartHeader = ({ cartItem }) => (
  <p className="mb-2">
    <Icofont icon="ui-press" className={"mr-1 text-success food-item"} />
    {cartItem.name} x {cartItem.quantity}
    <span className="float-right text-secondary">
      {cartItem.price * cartItem.quantity}
    </span>
  </p>
);
export default CartHeader;
