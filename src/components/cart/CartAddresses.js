import { Col, Row } from "react-bootstrap";
import React, { Component } from "react";

import AddAddressModal from "../modals/AddAddressModal";
import ChooseAddressCard from "../common/ChooseAddressCard";

class CartAddresses extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showAddressModal: false,
    };
  }
  hideAddressModal = () => this.setState({ showAddressModal: false });
  showAddressModal = () => this.setState({ showAddressModal: true });

  render() {
    return (
      <div className="bg-white rounded shadow-sm p-4 mb-4">
        <AddAddressModal
          show={this.state.showAddressModal}
          onHide={this.hideAddressModal}
        />
        <h4 className="mb-1">Choose a delivery address</h4>
        <h6 className="mb-3 text-black-50">
          Multiple addresses in this location
        </h6>
        <Row>
          <Col md={6}>
            <ChooseAddressCard
              boxclassName="border border-success"
              title="Work"
              icoIcon="briefcase"
              iconclassName="icofont-3x"
              address="NCC, Model Town Rd, Pritm Nagar, Model Town, Ludhiana, Punjab 141002, India"
            />
          </Col>
          <Col md={6}>
            <ChooseAddressCard
              title="Work"
              icoIcon="briefcase"
              iconclassName="icofont-3x"
              address="NCC, Model Town Rd, Pritm Nagar, Model Town, Ludhiana, Punjab 141002, India"
            />
          </Col>
          <Col md={6}>
            <ChooseAddressCard
              title="Work"
              icoIcon="briefcase"
              iconclassName="icofont-3x"
              address="NCC, Model Town Rd, Pritm Nagar, Model Town, Ludhiana, Punjab 141002, India"
            />
          </Col>
          <Col md={6}>
            <ChooseAddressCard
              title="Work"
              icoIcon="briefcase"
              iconclassName="icofont-3x"
              type="newAddress"
              address="NCC, Model Town Rd, Pritm Nagar, Model Town, Ludhiana, Punjab 141002, India"
              onAddNewClick={() => this.showAddressModal()}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
export default CartAddresses;
