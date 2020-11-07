import * as cartActions from "../../redux/actions/cartActions";
import * as productActions from "../../redux/actions/productActions";

import { Form, Modal } from "react-bootstrap";
import React, { Component } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class MenuModal extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      choosenOptions: "",
      options: [],
    };
  }
  componentDidMount() {
    this.props.actions.loadMenuOptions(
      this.props.menu.customer_id,
      this.props.menu.frm_product_id
    );
  }
  GetProductName = (productid) => {
    const item = this.props.products.find(
      (x) => x.frm_product_id === productid
    );
    return item.name;
  };

  HandleChange = (event) => {
    const { name, value } = event.target;
    let choosenNames = "";

    var optionExist = this.state.options.find((o) => o.name === name);
    if (optionExist === undefined) {
      this.state.options.push({
        name: name,
        value: this.GetProductName(value),
      });
    } else {
      optionExist.value = this.GetProductName(value);
      this.setState({ ...this.state.options, optionExist });
    }

    this.state.options.map((option) => (choosenNames += "-" + option.value));

    this.setState({ choosenOptions: choosenNames.substring(1) });
  };
  HandleSubmit = (event) => {
    event.preventDefault();
    const option = {
      choosenOptions: this.state.choosenOptions,
    };
    const product = {
      frm_product_id: this.props.menu.frm_product_id,
      name: this.props.menu.name,
      price: this.props.menu.price,
      options: option,
    };
    this.props.actions.addToCart({ quantity: 1, product });
    this.props.onHide();
  };
  render() {
    const { menu_options, menu } = this.props;
    console.log("menu options", menu_options);
    console.log("menu :", menu);
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-center"
          >
            Menu Options
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.HandleSubmit}>
          <Modal.Body>
            {menu_options &&
              menu_options.map((menu_option, index) => (
                <Form.Group key={index + 1}>
                  <Form.Label>Choose {index + 1}</Form.Label>
                  <Form.Control
                    as="select"
                    id={"category" + menu_option.category_id}
                    name={"category" + menu_option.category_id}
                    required
                    onChange={this.HandleChange}
                  >
                    <option value="">Choose</option>
                    {menu_option.product_ids.split(",")?.map((productid) => (
                      <option value={productid} key={productid}>
                        {this.GetProductName(productid)}
                      </option>
                    ))}
                  </Form.Control>
                  <br />
                </Form.Group>
              ))}
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-md btn-outline-primary btn-login font-weight-bold mb-2"
              type="submit"
            >
              Add To Cart
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadMenuOptions: bindActionCreators(
        productActions.loadMenuOptionsRequest,
        dispatch
      ),
      addToCart: bindActionCreators(cartActions.addMenuToCart, dispatch),
    },
  };
}
function mapStateToProps(state) {
  return {
    menu_options: state.menuOptionReducer,
    products: state.productReducer,
    categories: state.categoryReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MenuModal);
