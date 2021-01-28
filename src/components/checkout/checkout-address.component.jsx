import ChooseAddressCard from "../common/choose-address-card.component";
import React from "react";
import { Row } from "react-bootstrap";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserAddresses } from "../../redux/user/user.reselect";

const CheckoutAddress = ({ addresses }) => (
  <div className="bg-white rounded shadow-sm p-4 mb-4">
    <h4 className="mb-1">Choose a delivery address</h4>
    <h6 className="mb-3 text-black-50">Multiple addresses in this location</h6>
    <Row>
      {addresses.map((address) => (
        <ChooseAddressCard key={address.frm_user_adress_id} address={address} />
      ))}
      <ChooseAddressCard
        address={{
          address_type: "4",
          delivery_area: "Click to add new address",
        }}
        isAdd
      />
    </Row>
  </div>
);
const mapStateToProps = createStructuredSelector({
  addresses: selectUserAddresses,
});
export default connect(mapStateToProps)(CheckoutAddress);