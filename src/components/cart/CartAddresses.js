import * as addressActions from "../../redux/actions/addressActions";

import { Col, Row } from "react-bootstrap";
import React, { Component } from "react";

import AddAddressModal from "../modals/AddAddressModal";
import ChooseAddressCard from "../common/ChooseAddressCard";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class CartAddresses extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showAddressModal: false,
      addressTypes: [
        { id: "1", name: "Home" },
        { id: "2", name: "Work" },
        { id: "3", name: "Other" },
      ],
    };
  }
  componentDidMount() {
    if (this.props.addresses.length === 0) {
      this.props.actions.loadAddresses(1);
    }
  }
  hideAddressModal = () => this.setState({ showAddressModal: false });
  showAddressModal = () => this.setState({ showAddressModal: true });
  getAddressTypeName = (addressTypeId) => {
    const addressType = this.state.addressTypes.find(
      (x) => x.id === addressTypeId
    );
    return addressType ? addressType.name : "Unknown";
  };
  getAddressIcon = (addressTypeId) => {
    if (addressTypeId === "1") {
      return "home";
    } else if (addressTypeId === "2") {
      return "briefcase";
    } else {
      return "location-pin";
    }
  };
  render() {
    const { addresses } = this.props;
    console.log("address :", addresses);
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
          {addresses &&
            addresses.map((address) => (
              <Col md={6} key={address.frm_user_adress_id}>
                <ChooseAddressCard
                  boxclassName="border border-success"
                  title={this.getAddressTypeName(address.address_type)}
                  icoIcon={this.getAddressIcon(address.address_type)}
                  iconclassName="icofont-3x"
                  address={
                    address.delivery_area +
                    " - " +
                    address.delivery_instructions +
                    " - " +
                    address.location
                  }
                />
              </Col>
            ))}

          <Col md={6}>
            <ChooseAddressCard
              title="NEW ADDRESS"
              icoIcon="plus"
              iconclassName="icofont-6x"
              type="addAddress"
              address="Click to add new address"
              onAddNewClick={() => this.showAddressModal()}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
function mapDispatchToProp(dispatch) {
  return {
    actions: {
      loadAddresses: bindActionCreators(
        addressActions.loadAddressesRequest,
        dispatch
      ),
    },
  };
}
function mapStateToProps(state) {
  return {
    addresses: state.addressReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProp)(CartAddresses);
