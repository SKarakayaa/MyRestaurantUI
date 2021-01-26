import AddUpdateAddressModal from "../modals/add-update-address-modal.component";
import Icofont from "react-icofont";
import { Link } from "react-router-dom";
import React from "react";

class AddressAddUpdateButton extends React.Component {
  state = {
    modalIsShow: false,
    adressId: 0,
  };
  UpdateClick = () => {
    this.setState({ addressId: this.props.addressId });
    this.setState({ modalIsShow: true });
  };
  OnHide = () => {
    this.setState({ modalIsShow: false });
    this.setState({ addressId: 0 });
  };
  render() {
    const { isAdd } = this.props;
    const { modalIsShow, addressId } = this.state;
    return (
      <>
        {modalIsShow ? (
          <AddUpdateAddressModal
            show={modalIsShow}
            onHide={this.OnHide}
            addressId={addressId}
          />
        ) : null}
        {isAdd ? (
          <Link
            className="btn btn-sm btn-primary mr-2"
            to="#"
            onClick={() => this.setState({ modalIsShow: true })}
          >
            ADD NEW ADDRESS
          </Link>
        ) : (
          <Link
            className="text-primary mr-3"
            to="#"
            onClick={this.UpdateClick}
          >
            <Icofont icon="ui-edit" /> EDIT
          </Link>
        )}
      </>
    );
  }
}

export default AddressAddUpdateButton;
