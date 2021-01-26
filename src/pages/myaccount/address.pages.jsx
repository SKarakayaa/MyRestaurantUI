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
        <Col md={6} key={index}>
          <AddressCard address={address} cardType="address-info" />
        </Col>
      ))}
      <Col md={6}>
        <AddressCard
          address={{
            address_type: "4",
            delivery_area: "Click to add new address",
          }}
          isAdd
        />
      </Col>
    </Row>
  </div>
);
const mapStateToProps = createStructuredSelector({
  addresses: selectUserAddresses,
});
export default connect(mapStateToProps)(Address);
