import React from "react";
import { Row, Col } from "react-bootstrap";
import AddAddressModal from "../modals/AddAddressModal";
import DeleteAddressModal from "../modals/DeleteAddressModal";
import AddressCard from "../common/AddressCard";
import { connect } from "react-redux";
import * as addressActions from "../../redux/actions/addressActions";
import { bindActionCreators } from "redux";
import IsLogin from "../Helper";
import history from "../history";
class Addresses extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showDeleteModal: false,
      showAddressModal: false,
      choosedAddress: null,
      chosedDeleteAddressId: null,
      addressTypes: [
        { id: "1", name: "Home" },
        { id: "2", name: "Work" },
        { id: "3", name: "Other" },
      ],
    };
  }

  hideDeleteModal = () => this.setState({ showDeleteModal: false });
  hideAddressModal = () => {
    this.setState({ choosedAddress: null });
    this.setState({ showAddressModal: false });
  };
  componentDidMount() {
    if (this.props.addresses.length === 0) {
      this.props.action.loadAddresses(1);
    }
  }
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
  EditClick = (address) => {
    this.setState({ choosedAddress: address });
    this.setState({ showAddressModal: true });
  };
  DeleteClick = (addressid) => {
    this.setState({ chosedDeleteAddressId: addressid });
    this.setState({ showDeleteModal: true });
  };
  DeleteAddress = (addressid) => {
    this.props.action.deleteAddress(addressid);
  };
  render() {
    if (!IsLogin()) {
      history.push("/login");
    }
    const { addresses } = this.props;
    return IsLogin() ? (
      <>
        {this.state.showAddressModal ? (
          <AddAddressModal
            choosedAddress={this.state.choosedAddress}
            show={this.state.showAddressModal}
            onHide={this.hideAddressModal}
          />
        ) : (
          ""
        )}
        {this.state.showDeleteModal ? (
          <DeleteAddressModal
            show={this.state.showDeleteModal}
            onHide={this.hideDeleteModal}
            deleteAddress={this.DeleteAddress}
            addressid={this.state.chosedDeleteAddressId}
          />
        ) : (
          ""
        )}

        <div className="p-4 bg-white shadow-sm">
          <Row>
            <Col md={12}>
              <h4 className="font-weight-bold mt-0 mb-3">Manage Addresses</h4>
            </Col>
            {addresses.map((address) => (
              <Col md={6} key={address.frm_user_adress_id}>
                <AddressCard
                  boxClass="border border-primary shadow"
                  title={this.getAddressTypeName(address.address_type)}
                  icoIcon={this.getAddressIcon(address.address_type)}
                  cardType="address-info"
                  iconclassName="icofont-3x"
                  address={
                    address.delivery_area +
                    " - " +
                    address.delivery_instructions +
                    " - " +
                    address.location
                  }
                  onEditClick={() => this.EditClick(address)}
                  onDeleteClick={() =>
                    this.DeleteClick(address.frm_user_adress_id)
                  }
                />
              </Col>
            ))}
            <Col md={6}>
              <AddressCard
                boxClass="border border-primary shadow"
                title=""
                icoIcon="plus"
                iconclassName="icofont-9x"
                cardType="new-address"
                onEditClick={() => this.setState({ showAddressModal: true })}
                onDeleteClick={() => this.setState({ showDeleteModal: true })}
                onAddClick={() => this.setState({ showAddressModal: true })}
              />
            </Col>
          </Row>
        </div>
      </>
    ) : (
      ""
    );
  }
}
function mapStateToProps(state) {
  return {
    addresses: state.addressReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    action: {
      loadAddresses: bindActionCreators(
        addressActions.loadAddressesRequest,
        dispatch
      ),
      deleteAddress: bindActionCreators(
        addressActions.deleteAddressRequest,
        dispatch
      ),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Addresses);
