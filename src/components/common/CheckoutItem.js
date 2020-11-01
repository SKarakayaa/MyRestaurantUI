import * as cartActions from "../../redux/actions/cartActions";

import React, { Component } from "react";

import { Button } from "react-bootstrap";
import Icofont from "react-icofont";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class CheckoutItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.qty || 1,
      show: this.props.show || true,
      max: this.props.maxValue || 5,
      min: this.props.minValue || 0,
    };
  }

  IncrementItem = (productid, productName) => {
    const product = this.props.products.find(
      (p) => p.frm_product_id === productid && p.name === productName
    );
    if (product !== undefined) {
      this.props.actions.addToCart({ quantity: 1, product });
    } else {
      const menu = this.props.menus.find(
        (m) => m.frm_menus_id === productid && m.name === productName
      );
      this.props.actions.addMenuToCart({ quantity: 1, menu });
    }
  };
  DecreaseItem = (productid, productName) => {
    const product = this.props.products.find(
      (p) => p.frm_product_id === productid && p.name === productName
    );
    if (product !== undefined) {
      this.props.actions.removeFromCart(product);
    } else {
      const menu = this.props.menus.find(
        (m) => m.frm_menus_id === productid && m.name === productName
      );
      this.props.actions.removeMenuFromCart(menu);
    }
  };
  ToggleClick = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    const { id, quantity, itemName } = this.props;
    return (
      <div className="gold-members p-2 border-bottom">
        <span className="count-number float-right">
          <Button
            variant="outline-secondary"
            onClick={() => this.DecreaseItem(id, itemName)}
            className="btn-sm left dec"
          >
            {" "}
            <Icofont icon="minus" />{" "}
          </Button>
          <input
            className="count-number-input"
            type="text"
            value={quantity}
            readOnly
          />
          <Button
            variant="outline-secondary"
            onClick={() => this.IncrementItem(id, itemName)}
            className="btn-sm right inc"
          >
            {" "}
            <Icofont icon="icofont-plus" />{" "}
          </Button>
        </span>
        <p className="text-gray mb-0 float-right ml-2">
          {this.props.priceUnit} {this.props.price * this.props.quantity}
        </p>
        <div className="media">
          <div className="mr-2">
            <Icofont icon="ui-press" className="text-danger food-item" />
          </div>
          <div className="media-body">
            <p className="mt-1 mb-0 text-black">{itemName}</p>
          </div>
        </div>
      </div>
    );
  }
}

CheckoutItem.defaultProps = {
  show: true,
  priceUnit: "$",
};
function mapStateToProps(state) {
  return {
    products: state.productReducer,
    menus: state.productMenusReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      addToCart: bindActionCreators(cartActions.addToCart, dispatch),
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
      addMenuToCart: bindActionCreators(cartActions.addMenuToCart, dispatch),
      removeMenuFromCart: bindActionCreators(
        cartActions.removeMenuFromCart,
        dispatch
      ),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutItem);
