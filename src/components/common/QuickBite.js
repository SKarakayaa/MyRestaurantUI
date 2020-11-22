import * as cartActions from "../../redux/actions/cartActions";

import { Badge, Button, Image, Media } from "react-bootstrap";

import Icofont from "react-icofont";
import PropTypes from "prop-types";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import MenuModal from "./MenuModal";

class QuickBite extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      modalShow: false,
    };
  }

  IncrementItem = (product) => {
    this.props.actions.addToCart({ quantity: 1, product });
  };
  DecreaseItem = (product) => {
    this.props.actions.removeFromCart(product);
  };
  // addToCart = (product) => {
  //   this.props.actions.addToCart({ quantity: 1, product });
  // };
  isInCart = (productId) => {
    var item = this.props.cart.find((c) => c.product.id === productId);
    return item;
  };
  AddToCart = (product) => {
    debugger;
    if (product.product_materials !== "") {
      this.openModal();
    } else {
      this.props.actions.addToCart({ quantity: 1, product });
    }
  };
  openModal = () => this.setState({ modalShow: true });
  hideModal = () => this.setState({ modalShow: false });
  render() {
    const { product } = this.props;
    const isInCart = this.isInCart(product.frm_product_id);
    return (
      <div className={"p-3 border-bottom " + this.props.itemClass}>
        {this.state.modalShow ? (
          <MenuModal
            show={this.state.modalShow}
            onHide={this.hideModal}
            menu={product}
          />
        ) : (
          ""
        )}
        {isInCart === undefined ? (
          <span className="float-right">
            <Button
              variant="outline-secondary"
              onClick={() => this.AddToCart(product)}
              size="sm"
            >
              ADD
            </Button>
          </span>
        ) : (
          <span className="count-number float-right">
            <input
              className="count-number-input"
              type="text"
              value={isInCart.quantity}
              readOnly
            />
            <Button
              variant="outline-secondary"
              onClick={() => this.AddToCart(product)}
              className="btn-sm right inc"
            >
              {" "}
              <Icofont icon="icofont-plus" />{" "}
            </Button>
          </span>
        )}
        <Media>
		      {this.props.image?
		      	<Image className={"mr-3 rounded-pill " +this.props.imageClass} src={this.props.image} alt={this.props.imageAlt} width="50" height="50"/>
		      	:
		      	<div className="mr-3"><Icofont icon="ui-press" className={"text-"+this.props.badgeVariant+" food-item"} /></div>
		      }
		      <Media.Body>
		         <h6 className="mb-1">{this.props.title} {this.props.showBadge?<Badge variant={this.props.badgeVariant}>{this.props.badgeText}</Badge>:""}</h6>
		         <p className="text-gray mb-0">{this.props.priceUnit}{this.props.price}</p>
		      </Media.Body>
		   </Media>
      </div>
    );
  }
}

QuickBite.propTypes = {
  itemClass: PropTypes.string,
  title: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  image: PropTypes.string,
  imageClass: PropTypes.string,
  showBadge: PropTypes.bool,
  badgeVariant: PropTypes.string,
  badgeText: PropTypes.string,
  price: PropTypes.string.isRequired,
  priceUnit: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  qty: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
};
QuickBite.defaultProps = {
  itemClass: "gold-members",
  imageAlt: "",
  imageClass: "",
  showBadge: false,
  price: "",
  priceUnit: "$",
  showPromoted: false,
  badgeVariant: "danger",
};
function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      addToCart: bindActionCreators(cartActions.addToCart, dispatch),
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(QuickBite);
