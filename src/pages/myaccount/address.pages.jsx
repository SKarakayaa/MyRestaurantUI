import { Col, Row } from "react-bootstrap";

import AddressCard from "../../components/myaccount/address-card.component";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserAddresses } from "../../redux/user/user.reselect";

const Address = ({ addresses }) => (
  <div className="p-4 bg-white shadow-sm">
    <Row>
      <Col md={12}>
        <h4 className="font-weight-bold mt-0 mb-3">Manage Addresses</h4>
      </Col>
      {addresses.map((address, index) => (
        <AddressCard key={index} address={address} />
      ))}
      <AddressCard
        address={{
          address_type: "4",
        }}
        isAdd
      />
    </Row>
  </div>
);
const mapStateToProps = createStructuredSelector({
  addresses: selectUserAddresses,
});
export default connect(mapStateToProps)(Address);
