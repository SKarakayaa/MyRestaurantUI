import * as cartActions from "../../redux/actions/cartActions";

import { Badge, Button, Image } from "react-bootstrap";

import Icofont from "react-icofont";
import { Link } from "react-router-dom";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class BestSeller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.qty || 0,
      show: this.props.show || true,
      max: this.props.maxValue || 5,
      min: this.props.minValue || 0,
    };
  }

  IncrementItem = (product) => {
    this.addToCart(product);
  };
  DecreaseItem = (product) => {
    this.props.actions.removeFromCart(product);
  };

  addToCart = (product) => {
    this.props.actions.addToCart({quantity:1,product});
  };

  isInCart = () => {
    const productId = this.props.product.frm_product_id;
    const item = this.props.cart.find(
      (cartItem) => cartItem.product.id === productId
    );
    return item;
  };

  render() {
    const { product } = this.props;
    const isInCart = this.isInCart();
    return (
      <div className="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
        <div className="list-card-image">
          {this.props.rating ? (
            <div className="star position-absolute">
              <Badge variant="success">
                <Icofont icon="star" /> {this.props.rating}
              </Badge>
            </div>
          ) : (
            ""
          )}
          <div
            className={`favourite-heart position-absolute ${this.props.favIcoIconColor}`}
          >
            <Link to="#">
              <Icofont icon="heart" />
            </Link>
          </div>
          {this.props.showPromoted ? (
            <div className="member-plan position-absolute">
              <Badge variant={this.props.promotedVariant}>Promoted</Badge>
            </div>
          ) : (
            ""
          )}
          <Link to="#">
            <Image
              src={this.props.image}
              className={this.props.imageClass}
              alt={this.props.imageAlt}
            />
          </Link>
        </div>
        <div className="p-3 position-relative">
          <div className="list-card-body">
            <h6 className="mb-1">
              <Link to="#" className="text-black">
                {this.props.title}
              </Link>
            </h6>
            {this.props.subTitle ? (
              <p className="text-gray mb-3">{this.props.subTitle}</p>
            ) : (
              ""
            )}
            {this.props.price ? (
              <p className="text-gray time mb-0">
                <Link
                  className="btn btn-link btn-sm pl-0 text-black pr-0"
                  to="#"
                >
                  {this.props.priceUnit}
                  {this.props.price}{" "}
                </Link>
                {this.props.isNew ? (
                  <Badge variant="success" className="ml-1">
                    NEW
                  </Badge>
                ) : (
                  ""
                )}

                {isInCart === undefined ? (
                  <span className="float-right">
                    <Button
                      variant="outline-secondary"
                      onClick={() => this.addToCart(product)}
                      size="sm"
                    >
                      ADD
                    </Button>
                  </span>
                ) : (
                  <span className="count-number float-right">
                    <Button
                      variant="outline-secondary"
                      onClick={() => this.DecreaseItem(product)}
                      className="btn-sm left dec"
                    >
                      {" "}
                      <Icofont icon="minus" />{" "}
                    </Button>
                    <input
                      className="count-number-input"
                      type="text"
                      value={isInCart.quantity}
                      readOnly
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => this.IncrementItem(product)}
                      className="btn-sm right inc"
                    >
                      {" "}
                      <Icofont icon="icofont-plus" />{" "}
                    </Button>
                  </span>
                )}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}
BestSeller.defaultProps = {
  imageAlt: "",
  imageClass: "",
  isNew: false,
  subTitle: "",
  price: "",
  priceUnit: "$",
  showPromoted: false,
  promotedVariant: "dark",
  favIcoIconColor: "",
  rating: "",
};

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      addToCart: bindActionCreators(cartActions.addToCart, dispatch),
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
    },
  };
}
function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(BestSeller);
