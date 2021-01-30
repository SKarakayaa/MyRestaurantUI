import AddToCartHelper from "../../helpers/addToCartHelper";
import { Button } from "react-bootstrap";
import { Fragment } from "react";
import MenuModal from "../modals/menu-modal.component";
import React from "react";
import Translate from "../../utilities/translator";
import { addItem } from "../../redux/cart/cart.actions";
import alertifyjs from "alertifyjs";
import { connect } from "react-redux";
class AddToCartButton extends React.Component {
  state = {
    isOpenMenuModal: false,
  };
  CheckAndAddToCart = (product) => {
    const { addToCart } = this.props;
    if (product.is_menu || product.product_materials !== "") {
      this.setState({ isOpenMenuModal: true });
    } else {
      const productModel = AddToCartHelper.HandleMenuModalSubmit({}, product);
      addToCart(productModel);
      alertifyjs.success("Product is added to cart");
    }
  };

  OnHide = () => {
    this.setState({ isOpenMenuModal: false });
  };

  render() {
    const { isOpenMenuModal } = this.state;
    const { variant, className, product } = this.props;
    return (
      <Fragment>
        {isOpenMenuModal ? (
          <MenuModal
            show={isOpenMenuModal}
            onHide={this.OnHide}
            product={product}
          />
        ) : null}
        <Button
          type="button"
          variant={variant}
          className={className}
          onClick={() => this.CheckAndAddToCart(product)}
        >
          <Translate lang="tr">ADD</Translate>
        </Button>
      </Fragment>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  addToCart: (cartItem) => dispatch(addItem(cartItem)),
});
export default connect(null, mapDispatchToProps)(AddToCartButton);
