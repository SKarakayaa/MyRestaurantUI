import AddressCard from "../myaccount/address-card.component";
import React from "react";
import { Row } from "react-bootstrap";
import Translate from "../../utilities/translator";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserAddresses } from "../../redux/user/user.reselect";

const CheckoutAddress = ({ addresses }) => (
  <div className="bg-white rounded shadow-sm p-4 mb-4">
    <h4 className="mb-1">
      <Translate>Choose a delivery address</Translate>
    </h4>
    {/* <h6 className="mb-3 text-black-50">Multiple addresses in this location</h6> */}
    <Row>
      {addresses.map((address) => (
        <AddressCard
          address={address}
          isCheckout
          key={address.frm_user_adress_id}
        />
      ))}
      <AddressCard isAdd isCheckout address={{ address_type: "4" }} />
    </Row>
  </div>
);
const mapStateToProps = createStructuredSelector({
  addresses: selectUserAddresses,
});
export default connect(mapStateToProps)(CheckoutAddress);
