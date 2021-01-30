import * as cartActions from "../../redux/actions/cartActions";
import * as productActions from "../../redux/actions/productActions";

import { Form, Modal } from "react-bootstrap";
import React, { Component } from "react";

import Select from "react-select";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class MenuModal extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      choosedMaterials: "",
      choosenOptions: "",
      removedMaterials: "",
      totalMaterialPrice: 0,
      options: [],
    };
  }
  componentDidMount() {
    this.props.actions.loadMenuOptions(
      this.props.menu.customer_id,
      this.props.menu.frm_product_id
    );
    this.props.actions.loadMaterials(this.props.menu.customer_id);
  }
  GetProductName = (productid) => {
    const item = this.props.products.find(
      (x) => x.frm_product_id === productid
    );
    return item.name;
  };
  //materialListType 0 = can add materials, materialListType 1 = can removable items
  GetProductMaterials = (product, materialListType) => {
    const material_ids = product.product_materials.split(",");
    let materials = [];
    material_ids.forEach((material_id) => {
      let material = this.props.materials.find(
        (x) => x.frm_product_materials_id === material_id
      );
      materials.push({
        value: material.frm_product_materials_id,
        label:
          materialListType === 1
            ? material.product_materials +
              "-" +
              parseFloat(material.amount).toFixed(2)
            : material.product_materials,
      });
    });
    return materials;
  };
  HandleMultiSelectChange = (event) => {
    let choosenMaterialNames = "";
    let totalMaterialPrice = 0;
    if (event !== null) {
      event.forEach((e) => {
        let values = e.label.split("-");
        choosenMaterialNames += "-" + values[0];
        totalMaterialPrice += parseInt(values[1]);
      });
    }
    this.setState({ totalMaterialPrice: totalMaterialPrice });
    this.setState({ choosedMaterials: choosenMaterialNames.substring(1) });
  };
  HandleMultiSelectChangeForRemovable = (event) => {
    let removableMaterials = this.GetProductMaterials(this.props.menu, 2);
    let removedMaterialsName = "";
    if (event !== null) {
      event.forEach((e) => {
        removableMaterials = removableMaterials.filter(
          (item) => item.value !== e.value
        );
      });
    }
    removableMaterials.forEach((item) => {
      removedMaterialsName += item.label + " ";
    });
    this.setState({ removedMaterials: removedMaterialsName });
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
      price: parseInt(this.props.menu.price),
      is_menu: this.props.menu.is_menu,
      options: option,
    };
    if (this.state.choosedMaterials !== "") {
      const materials = {
        choosenMaterials: this.state.choosedMaterials,
        totalMaterialsPrice: this.state.totalMaterialPrice,
      };
      if (this.state.removedMaterials !== "") {
        materials.choosenMaterials +=
          " And Without " + this.state.removedMaterials;
      }
      product.materials = materials;
    } else if (this.state.choosedMaterials === "" && !this.props.menu.is_menu) {
      const materials = {
        choosenMaterials: "No additional products selected",
        totalMaterialsPrice: this.state.totalMaterialPrice,
      };
      if (this.state.removedMaterials !== "") {
        materials.choosenMaterials +=
          " And Without " + this.state.removedMaterials;
      }
      product.materials = materials;
    }
    this.props.actions.addToCart({ quantity: 1, product });
    this.props.onHide();
  };

  render() {
    const { menu_options, menu } = this.props;
    let materialList = [];
    let removableMaterials = [];
    if (this.props.materials.length !== 0 && menu.product_materials !== "") {
      materialList = this.GetProductMaterials(menu, 1);
    }
    if (this.props.materials.length !== 0 && menu.materials_removed !== "") {
      removableMaterials = this.GetProductMaterials(menu, 2);
    }
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
            {materialList.length !== 0 ? (
              <Form.Group>
                <Form.Label>Can Be Added Materials</Form.Label>
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
                <Form.Label>Removable Materials</Form.Label>
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
      loadMaterials: bindActionCreators(
        productActions.loadMaterialsRequest,
        dispatch
      ),
      addToCart: bindActionCreators(cartActions.addMenuToCart, dispatch),
    },
  };
}
function mapStateToProps(state) {
  return {
    menu_options: state.menuOptionReducer,
    materials: state.materialReducer,
    products: state.productReducer,
    categories: state.categoryReducer,
    customerinfo: state.customerInfoReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MenuModal);
