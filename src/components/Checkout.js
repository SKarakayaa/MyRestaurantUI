import * as cartActions from "../redux/actions/cartActions";
import * as orderActions from "../redux/actions/orderActions";
import * as productActions from "../redux/actions/productActions";
import * as userActions from "../redux/actions/userActions";

import {
  Button,
  Col,
  Container,
  Form,
  Image,
  InputGroup,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import IsLogin, { CurrentCustomerId } from "./Helper";

import CartAddresses from "./cart/CartAddresses";
import CheckoutItem from "./common/CheckoutItem";
import Icofont from "react-icofont";
import ItemsCarousel from "./common/ItemsCarousel";
import PaymentChoose from "./cart/PaymentChoose";
import React from "react";
import alertify from "alertifyjs";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import history from "./history";

class Checkout extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      addressid: 0,
    };
  }
  componentDidMount() {
    if (this.props.menus.length === 0) {
      this.props.actions.loadMenu(CurrentCustomerId());
    }
    if (this.props.products.length === 0) {
      this.props.actions.loadProducts(CurrentCustomerId());
    }
    this.props.actions.loadCurrentUser();
  }
  calculateTotalPrice = () => {
    const { cart } = this.props;
    var totalPrice = 0;
    cart.map((cartItem) => (totalPrice += cartItem.subTotal));
    return totalPrice;
  };
  CreateOrder = () => {
    let valid = this.ValidatePayment();
    if (valid.isValid) {
      const { currentUser } = this.props;
      const totalPrice = this.calculateTotalPrice();
      const order = {
        user_id: currentUser.session.userId,
        address_id: this.state.addressid,
        payment_methods: 2,
        total_price: totalPrice,
        channel_type_id: 1,
        customer_id: 1,
        order_date: new Date(),
      };
      this.props.actions.createOrder(order, this.props.cart);
      alertify.success("Payment is successfull !");
      this.props.actions.removeCart();
    } else {
      alertify.error(valid.errorMessage);
    }
  };
  ValidatePayment = () => {
    var validObject = {
      isValid: true,
      errorMessage: "",
    };
    if (this.props.cart.length === 0) {
      validObject.isValid = false;
      validObject.errorMessage = "Your Cart is Empty !";
    }
    if (this.state.addressid === 0) {
      validObject.isValid = false;
      validObject.errorMessage = "You didn't choose any address !";
    }
    return validObject;
  };
  ChangeAddressId = (addressid) => {
    this.setState({ addressid: addressid });
  };
  render() {
    const { cart, customerInfo } = this.props;
    if (!IsLogin()) {
      history.push("/login");
    }

    return (
      <section className="offer-dedicated-body mt-4 mb-4 pt-2 pb-2">
        <Container>
          <Row>
            <Col md={8}>
              <div className="offer-dedicated-body-left">
                <div className="bg-white rounded shadow-sm p-4 mb-4">
                  <h6 className="mb-3">You may also like</h6>
                  <ItemsCarousel />
                </div>

                <div className="pt-2"></div>

                {/* TODO : ADDRESSLER AYRI COMPONENT OLMALI */}
                {IsLogin() ? (
                  <CartAddresses
                    ChangeAddressId={this.ChangeAddressId}
                    ChoosedAddressId={this.state.addressid}
                  />
                ) : (
                  ""
                )}

                <div className="pt-2"></div>

                {/* PAYMENT METHOD AYRI BİR COMPONENT OLMALI */}
                <PaymentChoose
                  CreateOrder={this.CreateOrder}
                  AddressId={this.state.addressid}
                />
              </div>
            </Col>

            {/* DISCOUNTS AND FINAL PRICE */}
            <Col md={4}>
              <div className="generator-bg rounded shadow-sm mb-4 p-4 osahan-cart-item">
                <div className="d-flex mb-4 osahan-cart-item-profile">
                  <Image
                    fluid
                    className="mr-3 rounded-pill"
                    alt="osahan"
                    src="/img/2.jpg"
                  />
                  <div className="d-flex flex-column">
                    <h6 className="mb-1 text-white">
                      Spice Hut Indian Restaurant
                    </h6>
                    <p className="mb-0 text-white">
                      <Icofont icon="location-pin" /> 2036 2ND AVE, NEW YORK, NY
                      10029
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded shadow-sm mb-2">
                  {cart.map((cartItem) => (
                    <CheckoutItem
                      key={cartItem.product.id}
                      itemName={cartItem.product.name}
                      price={cartItem.product.price}
                      quantity={cartItem.quantity}
                      product={cartItem.product}
                      subTotal={cartItem.subTotal}
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
                {/* PROMO CODE AND SUGGESTIONS */}
                <div className="mb-2 bg-white rounded p-2 clearfix">
                  <InputGroup className="input-group-sm mb-2">
                    <Form.Control type="text" placeholder="Enter promo code" />
                    <InputGroup.Append>
                      <Button variant="primary" type="button">
                        <Icofont icon="sale-discount" /> APPLY
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                  <InputGroup className="mb-0">
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <Icofont icon="comment" />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      as="textarea"
                      placeholder="Any suggestions? We will pass it on..."
                      aria-label="With textarea"
                    />
                  </InputGroup>
                </div>
                {/* CART TOTAL INFORMATIONS */}
                <div className="mb-2 bg-white rounded p-2 clearfix">
                  <p className="mb-1">
                    Item Total{" "}
                    <span className="float-right text-dark">
                      {this.calculateTotalPrice() + customerInfo.currency_unit}
                    </span>
                  </p>

                  {/* DISCOUNTS */}
                  <p className="mb-1">
                    Restaurant Charges{" "}
                    <span className="float-right text-dark">$62.8</span>
                  </p>
                  <p className="mb-1">
                    Delivery Fee
                    <OverlayTrigger
                      key="top"
                      placement="top"
                      overlay={
                        <Tooltip id="tooltip-top">
                          Total discount breakup
                        </Tooltip>
                      }
                    >
                      <span className="text-info ml-1">
                        <Icofont icon="info-circle" />
                      </span>
                    </OverlayTrigger>
                    <span className="float-right text-dark">$10</span>
                  </p>
                  <p className="mb-1 text-success">
                    Total Discount
                    <span className="float-right text-success">$1884</span>
                  </p>
                  <hr />

                  {/* TOTAL PRICE AFTER DISCOUNTS */}
                  <h6 className="font-weight-bold mb-0">
                    TO PAY{" "}
                    <span className="float-right">
                      {this.calculateTotalPrice() + customerInfo.currency_unit}
                    </span>
                  </h6>
                </div>
                {/* <button
                  onClick={() => this.CreateOrder()}
                  className="btn btn-success btn-block btn-lg"
                  disabled={!this.ValidatePayment()}
                >
                  {"PAY" + this.calculateTotalPrice() + " £"}
                  <Icofont icon="long-arrow-right" />
                </button> */}
              </div>

              <div className="pt-2"></div>
              <div className="alert alert-success" role="alert">
                You have saved <strong>$1,884</strong> on the bill
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
    menus: state.menuReducer,
    currentUser: state.currentUserReducer,
    products: state.productReducer,
    customerInfo: state.customerInfoReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadMenu: bindActionCreators(productActions.loadMenusRequest, dispatch),
      createOrder: bindActionCreators(
        orderActions.createOrderRequest,
        dispatch
      ),
      removeCart: bindActionCreators(cartActions.removeCart, dispatch),
      loadCurrentUser: bindActionCreators(userActions.getCurrentUser, dispatch),
      loadProducts: bindActionCreators(
        productActions.loadProductsRequest,
        dispatch
      ),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
