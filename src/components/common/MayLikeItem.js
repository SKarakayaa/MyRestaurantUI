import React from "react";
import { Image, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";

class MayLikeItem extends React.Component {
  addMenuToCart = (menu) => {
    this.props.actions.addMenuToCart({ quantity: 1, menu });
  };
  render() {
    const { menu } = this.props;
    return (
      <div className={"position-relative " + this.props.boxClass}>
        <Button
          onClick={() => this.addMenuToCart(menu)}
          className="btn btn-primary btn-sm position-absolute"
        >
          ADD
        </Button>
        <Image
          src={this.props.image}
          className={this.props.imageClass}
          alt={this.props.imageAlt}
        />
        {this.props.title ? <h6>{this.props.title}</h6> : ""}
        {this.props.price ? <small>{this.props.price}</small> : ""}
      </div>
    );
  }
}
MayLikeItem.defaultProps = {
  imageAlt: "",
  image: "",
  imageClass: "",
  boxClass: "mall-category-item",
  title: "",
  price: "",
};
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      addMenuToCart: bindActionCreators(cartActions.addMenuToCart, dispatch),
    },
  };
}
export default connect(null, mapDispatchToProps)(MayLikeItem);
