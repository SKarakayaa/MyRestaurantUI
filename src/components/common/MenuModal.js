import * as productActions from "../../redux/actions/productActions";

import { Button, Form, Modal } from "react-bootstrap";
import React, { Component } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class MenuModal extends Component {
  componentDidMount() {
    this.props.actions.loadMenuOptions(
      this.props.menu.customer_id,
      this.props.menu.frm_product_id
    );
  }
  GetProductName = (productid) => {
      const item = this.props.products.find(x=>x.frm_product_id === productid);
      return item.name;
  }
  render() {
    const { menu_options, products, categories } = this.props;
    console.log("products :", products);
    console.log("categories :", categories);
    console.log("menu options : ", menu_options);
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
        <Modal.Body>
          <Form>
            {menu_options &&
              menu_options.map((menu_option, index) => (
                <Form.Group key={index + 1}>
                  <Form.Label>Choose {index + 1}</Form.Label>
                  <Form.Control as="select">
                    {menu_option.product_ids.split(",")?.map((productid) => (
                      <option value={productid} key={productid}>{this.GetProductName(productid)}</option>
                    ))}
                  </Form.Control>
                  <br />
                </Form.Group>
              ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Add To Cart</Button>
        </Modal.Footer>
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
