import Icofont from "react-icofont";
import React from "react";

const CartDropdownItem = ({ price, title }) => (
  <p className="mb-2">
    <Icofont icon="ui-press" className="mr-1 text-danger food-item" />
    {title}
    <span className="float-right text-secondary">{price}</span>
  </p>
);
export default CartDropdownItem;
