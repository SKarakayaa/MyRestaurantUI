import AddressCard from "../myaccount/address-card.component";
import React from "react";
// import { Redirect } from "react-router-dom";
import { Row } from "react-bootstrap";
import Translate from "../../utilities/translator";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectChoosedAddress } from "../../redux/order/order.reselect";
import { selectIsMainSite } from "../../redux/customer/customer.reselect";
import { selectUserAddresses } from "../../redux/user/user.reselect";

const CheckoutAddress = ({ addresses, isMainSite, choosedAddress }) => {
  console.log("addresses :", addresses);
  console.log("choosedAddress :", choosedAddress);
  return (
    <div className="bg-white rounded shadow-sm p-4 mb-4">
      <h4 className="mb-1">
        <Translate>Choose a delivery address</Translate>
      </h4>
      <Row>
        {isMainSite && choosedAddress !== null ? (
          <AddressCard
            address={addresses.find(
              (address) =>
                address.frm_user_adress_id === choosedAddress.frm_user_adress_id
            )}
            isCheckout
          />
        ) : (
          addresses.map((address) => (
            <AddressCard
              address={address}
              isCheckout
              key={address.frm_user_adress_id}
            />
          ))
        )}
        {!isMainSite && (
          <AddressCard isAdd isCheckout address={{ address_type: "4" }} />
        )}
      </Row>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  addresses: selectUserAddresses,
  isMainSite: selectIsMainSite,
  choosedAddress: selectChoosedAddress,
});
export default connect(mapStateToProps)(CheckoutAddress);
