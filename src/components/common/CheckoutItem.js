import * as cartActions from "../../redux/actions/cartActions";

import React, { Component, Fragment } from "react";

import { Button } from "react-bootstrap";
import Icofont from "react-icofont";
import MenuModal from "./MenuModal";
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
      modalShow: false,
    };
  }
  openModal = () => this.setState({ modalShow: true });
  hideModal = () => this.setState({ modalShow: false });
  IncrementItem = (productid) => {
    const product = this.props.products.find(
      (p) => p.frm_product_id === productid
    );
    if (product.is_menu === true || product.product_materials !== "") {
      this.openModal();
    } else {
      this.props.actions.addToCart({ quantity: 1, product });
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
  RemoveMenuFromCart = (productid, optionUniqueId, materialUniqueId) => {
    this.props.actions.removeMenuFromCart(productid, optionUniqueId, materialUniqueId);
  };
  ToggleClick = () => {
    this.setState({ show: !this.state.show });
  };
  GetProduct = (productid) => {
    return this.props.products.find((x) => x.frm_product_id === productid);
  };
  GetOptionNames = (optionid) => {
    const { product } = this.props;
    let options = "";
    const option = product.options.find((x) => x.id === optionid);

    options += option.choosenOptions;
    if (Object.keys(product.materials).length !== 0) {
      options += product.materials.find((x) => x.option_id === optionid)
        .choosenMaterials;
    }

    return options;
  };
  GetOptionList = () => {
    return this.props.product.options.map((option) => (
      <div className="media" key={option.id}>
        <div className="mr-1">
          <span className="count-number">
            <Button
              variant="outline-secondary"
              className="btn-sm dec"
              onClick={() =>
                this.RemoveMenuFromCart(this.props.product.id, option.id, null)
              }
            >
              {" "}
              x
            </Button>
          </span>
        </div>
        <div className="media-body">
          <p className="mt-1 mb-0">{this.GetOptionNames(option.id)}</p>
        </div>
      </div>
    ));
  };

  GetMaterialList = () => {
    const { product } = this.props;
    return product.materials.map((material) => (
      <div className="media" key={material.id}>
        <div className="mr-1">
          <span className="count-number">
            <Button
              variant="outline-secondary"
              className="btn-sm dec"
              onClick={() =>
                this.RemoveMenuFromCart(
                  this.props.product.id,
                  null,
                  material.id
                )
              }
            >
              {" "}
              x
            </Button>
          </span>
        </div>
        <div className="media-body">
          <p className="mt-1 mb-0">{material.choosenMaterials}</p>
        </div>
      </div>
    ));
  };

  render() {
    const { id, quantity, itemName, product } = this.props;
    return (
      <Fragment>
        {this.state.modalShow ? (
          <MenuModal
            show={this.state.modalShow}
            onHide={this.hideModal}
            menu={this.GetProduct(product.id)}
          />
        ) : (
          ""
        )}

        <div className="gold-members p-2 border-bottom">
          <span className="count-number float-right">
            <Button
              disabled={product.is_menu || Object.keys(product.materials).length !== 0}
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
              onClick={() => this.IncrementItem(id)}
              className="btn-sm right inc"
            >
              {" "}
              <Icofont icon="icofont-plus" />{" "}
            </Button>
          </span>
          <p className="text-gray mb-0 float-right ml-2">
            {this.props.priceUnit} {this.props.subTotal}
          </p>
          <div className="media">
            <div className="mr-2">
              <Icofont icon="ui-press" className="text-danger food-item" />
            </div>
            <div className="media-body">
              <p className="mt-1 mb-0 text-black">{itemName}</p>
            </div>
          </div>

          {product.is_menu ? product.options && this.GetOptionList() : ""}
          {!product.is_menu && Object.keys(product.materials).length !== 0
            ? this.GetMaterialList()
            : ""}
        </div>
      </Fragment>
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
