import { Form, Modal } from "react-bootstrap";
import {
  selectMenuOptions,
  selectProductMaterials,
  selectProducts,
} from "../../redux/product/product.reselect";

import AddToCartHelper from "../../helpers/addToCartHelper";
import React from "react";
import Select from "react-select";
import Translate from "../../utilities/translator";
import { TranslatePlaceholder } from "../../utilities/translator-placeholder";
import { addItem } from "../../redux/cart/cart.actions";
import alertifyjs from "alertifyjs";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchMenuOptionsAsync } from "../../redux/product/product.actions";

class MenuModal extends React.Component {
  state = {
    choosedMaterials: "",
    choosenOptions: "",
    removedMaterials: "",
    totalMaterialPrice: 0,
    options: [],
  };
  componentDidMount() {
    const { laodMenuOptions, product } = this.props;
    laodMenuOptions(product.customer_id, product.frm_product_id);
  }
  GetProductName = (productid) => {
    const { products } = this.props;
    const item = products.find((x) => x.frm_product_id === productid);
    return item.name;
  };
  //materialListType 0 = can add materials, materialListType 1 = can removable items
  GetProductMaterials = (product, materialListType) => {
    const { productmaterials } = this.props;
    var materials = AddToCartHelper.GetProductMaterials(
      product,
      materialListType,
      productmaterials
    );
    return materials;
  };
  HandleMultiSelectChange = (event) => {
    const selectChangeMaterial = AddToCartHelper.HandleMaterialChanges(event);
    this.setState({
      totalMaterialPrice: selectChangeMaterial.totalMaterialPrice,
    });
    this.setState({
      choosedMaterials: selectChangeMaterial.choosenMaterialNames.substring(1),
    });
  };
  HandleMultiSelectChangeForRemovable = (event) => {
    const { product } = this.props;
    let removableMaterials = this.GetProductMaterials(product, 2);
    const removedMaterialsName = AddToCartHelper.HandleRemovableMaterialChange(
      event,
      removableMaterials
    );
    this.setState({ removedMaterials: removedMaterialsName });
  };
  HandleSubmit = (event) => {
    event.preventDefault();
    const { product, addToCart, onHide } = this.props;
    const productModel = AddToCartHelper.HandleMenuModalSubmit(
      this.state,
      product
    );
    addToCart(productModel);
    alertifyjs.success("Product is added to cart");
    onHide();
  };
  HandleChange = (event) => {
    const { options } = this.state;
    const { name, value } = event.target;
    let choosenNames = "";

    var optionExist = options.find((o) => o.name === name);
    if (optionExist === undefined) {
      options.push({
        name: name,
        value: this.GetProductName(value),
      });
    } else {
      optionExist.value = this.GetProductName(value);
      this.setState({ ...options, optionExist });
    }
    options.map((option) => (choosenNames += "-" + option.value));
    this.setState({ choosenOptions: choosenNames.substring(1) });
  };
  render() {
    const { product, menuOptions, productmaterials, show, onHide } = this.props;
    let materialList = [];
    let removableMaterials = [];
    if (productmaterials.length !== 0 && product.product_materials !== "") {
      materialList = this.GetProductMaterials(product, 1);
    }
    if (productmaterials.length !== 0 && product.materials_removed !== "") {
      removableMaterials = this.GetProductMaterials(product, 2);
    }
    return (
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-center"
          >
            <Translate >Menu Options</Translate>
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.HandleSubmit}>
          <Modal.Body>
            {menuOptions &&
              menuOptions.map((menu_option, index) => (
                <Form.Group key={index + 1}>
                  <Form.Label>
                    <Translate >Choose</Translate> {index + 1}
                  </Form.Label>
                  <Form.Control
                    as="select"
                    id={"category" + menu_option.category_id}
                    name={"category" + menu_option.category_id}
                    required
                    onChange={this.HandleChange}
                  >
                    <option value="">
                      {TranslatePlaceholder("Choose...")}
                    </option>
                    {menu_option.product_ids.split(",")?.map((productid) => (
                      <option value={productid} key={productid}>
                        {this.GetProductName(productid)}
                      </option>
                    ))}
                  </Form.Control>
                  <br />
                </Form.Group>
              ))}
            {materialList.length !== 0 ? (
              <Form.Group>
                <Form.Label>
                  <Translate >Can Be Added Materials</Translate>
                </Form.Label>
                <Select
                  defaultValue="Choose"
                  isMulti
                  name="material"
                  options={materialList}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={this.HandleMultiSelectChange}
                />
              </Form.Group>
            ) : (
              ""
            )}
            {removableMaterials.length !== 0 ? (
              <Form.Group>
                <Form.Label>
                  <Translate >Removable Materials</Translate>
                </Form.Label>
                <Select
                  isMulti
                  defaultValue={removableMaterials}
                  name="removableMaterial"
                  options={removableMaterials}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={this.HandleMultiSelectChangeForRemovable}
                />
              </Form.Group>
            ) : (
              ""
            )}
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-md btn-outline-primary btn-login font-weight-bold mb-2"
              type="submit"
            >
              <Translate >Add To Cart</Translate>
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  productmaterials: selectProductMaterials,
  products: selectProducts,
  menuOptions: selectMenuOptions,
});
const mapDispatchToProps = (dispatch) => ({
  laodMenuOptions: (customerid, productid) =>
    dispatch(fetchMenuOptionsAsync(customerid, productid)),
  addToCart: (cartItem) => dispatch(addItem(cartItem)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MenuModal);
