import {
  selectCartItems,
  selectCartItemsCount,
  selectCartTotal,
} from "../../redux/cart/cart.reselect";

import CartSideItem from "./cart-side-item.component";
import Icofont from "react-icofont";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";
import Translate from "../../utilities/translator";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCustomerInfo } from "../../redux/customer/customer.reselect";

const CartSide = ({ cartItems, cartItemsCount, cartTotal, customerInfo }) =>
  cartItems.length === 0 ? (
    <div className="generator-bg rounded shadow-sm mb-4 p-4 osahan-cart-item">
      <h5 className="mb-1 text-white">
        <Translate lang="tr">Your Orders</Translate>
      </h5>
      <p className="mb-4 text-white">
        <Translate lang="tr">Cart is Empty</Translate>
      </p>

      <div className="mb-2 bg-white rounded p-2 clearfix">
        <Translate lang="tr">You didn't add to cart anything !</Translate>
      </div>
    </div>
  ) : (
    <div className="generator-bg rounded shadow-sm mb-4 p-4 osahan-cart-item">
      <h5 className="mb-1 text-white">
        <Translate lang="tr">Your Orders</Translate>
      </h5>
      <p className="mb-4 text-white">
        {cartItemsCount} <Translate lang="tr">Items</Translate>
      </p>
      <div className="bg-white rounded shadow-sm mb-2">
        {cartItems.map((cartItem) => (
          <CartSideItem
            key={cartItem.id}
            cartItem={cartItem}
            currencyUnit={customerInfo.currency_unit}
          />
        ))}
      </div>
      <div className="mb-2 bg-white rounded p-2 clearfix">
        <Image fluid className="float-left" src="/img/wallet-icon.png" />
        <h6 className="font-weight-bold text-right mb-2">
          <Translate lang="tr">Sub Total</Translate>{" "}
          <span className="text-danger">
            {cartTotal} {customerInfo.currency_unit}
          </span>
        </h6>
        <p className="seven-color mb-1 text-right">
          <Translate lang="tr">Extra charges may apply</Translate>{" "}
        </p>
        {/* <p className="text-black mb-0 text-right">
          You have saved $955 on the bill
        </p> */}
      </div>
      <Link to="/checkout" className="btn btn-success btn-block btn-lg">
        <Translate lang="tr">Checkout</Translate>
        <Icofont icon="long-arrow-right" />
      </Link>
      <div className="pt-2"></div>
    </div>
  );
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartItemsCount: selectCartItemsCount,
  cartTotal: selectCartTotal,
  customerInfo: selectCustomerInfo,
});
export default connect(mapStateToProps)(CartSide);
