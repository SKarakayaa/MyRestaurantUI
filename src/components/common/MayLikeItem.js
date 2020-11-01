import * as cartActions from "../../redux/actions/cartActions";

import { Button, Image } from "react-bootstrap";
import React, { Fragment } from "react";

import MenuModal from "./MenuModal";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class MayLikeItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      modalShow: false,
    };
  }
  addMenuToCart = (menu) => {
    this.props.actions.addMenuToCart({ quantity: 1, menu });
  };
  openModal = () => this.setState({ modalShow: true });
  hideModal = () => this.setState({ modalShow: false });
  render() {
    const { menu } = this.props;
    return (
      <Fragment>
        {this.state.modalShow ? (
          <MenuModal
            show={this.state.modalShow}
            onHide={this.hideModal}
            menu={menu}
          />
        ) : (
          ""
        )}
        <div className={"position-relative " + this.props.boxClass}>
          <Button
            onClick={() => this.openModal()}
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
      </Fragment>
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
