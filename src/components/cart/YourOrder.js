import React, { Component } from "react";

import CheckoutItem from "../common/CheckoutItem";
import Icofont from "react-icofont";
import { Image } from "react-bootstrap";
import { connect } from "react-redux";
import history from "../history";

class YourOrder extends Component {
  calculateTotalPrice = () => {
    const { cart } = this.props;
    var totalPrice = 0;
    cart.map(
      (cartItem) => (totalPrice += cartItem.subTotal)
    );
    return totalPrice;
  };
  Checkout = () => {
    if(this.props.currentUser === null){
      history.push("/login");
    }else{
      history.push("/checkout");
    }
  };
  cartEmpty = () => {
    return (
      <div className="generator-bg rounded shadow-sm mb-4 p-4 osahan-cart-item">
        <h5 className="mb-1 text-white">Your Order</h5>
        <p className="mb-4 text-white">Cart Empty</p>

        <div className="mb-2 bg-white rounded p-2 clearfix">
          You didn't add to cart anything !
        </div>
      </div>
    );
  };
  cartNotEmpty = () => {
    const { cart,customerInfo } = this.props;
    return (
      <div className="generator-bg rounded shadow-sm mb-4 p-4 osahan-cart-item">
        <h5 className="mb-1 text-white">Your Order</h5>
        <p className="mb-4 text-white">{cart.length + " items"}</p>
        <div className="bg-white rounded shadow-sm mb-2">
          {cart.map((cartItem) => (
            <CheckoutItem
              key={cartItem.product.id}
              itemName={cartItem.product.name}
              price={cartItem.product.price}
              quantity={cartItem.quantity}
              subTotal={cartItem.subTotal}
              product={cartItem.product}
              priceUnit={customerInfo.currency_unit}
              id={cartItem.product.id}
              qty={2}
              show={true}
              minValue={0}
              maxValue={7}
              getValue={this.getQty}
            />
          ))}
        </div>
        <div className="mb-2 bg-white rounded p-2 clearfix">
          <Image fluid className="float-left" src="/img/wallet-icon.png" />
          <h6 className="font-weight-bold text-right mb-2">
            Subtotal :{" "}
            <span className="text-danger">{customerInfo.currency_unit +" "+ this.calculateTotalPrice()} </span>
          </h6>
          <p className="seven-color mb-1 text-right">Extra charges may apply</p>
          <p className="text-black mb-0 text-right">
            You have saved $955 on the bill
          </p>
        </div>
        <button
          onClick={() => this.Checkout()}
          className="btn btn-success btn-block btn-lg"
        >
          Checkout
          <Icofont icon="long-arrow-right" />
        </button>
        <div className="pt-2"></div>
      </div>
    );
  };
  render() {
    return this.props.cart.length === 0
      ? this.cartEmpty()
      : this.cartNotEmpty();
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
    currentUser: state.currentUserReducer,
    customerInfo: state.customerInfoReducer
  };
}
export default connect(mapStateToProps)(YourOrder);
