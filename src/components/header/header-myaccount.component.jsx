import {
  selectCustomerId,
  selectIsMainSite,
} from "../../redux/customer/customer.reselect";

import DropDownTitle from "../common/dropdown-title.component";
import Icofont from "react-icofont";
import { NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import React from "react";
import Translate from "../../utilities/translator";
import { TranslatePlaceholder } from "../../utilities/translator-placeholder";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

const HeaderMyAccount = ({ customerId, isMainSite }) => (
  <NavDropdown
    alignRight
    title={
      <DropDownTitle
        className="d-inline-block"
        image="img/user/4.png"
        imageAlt="user"
        imageClass="nav-osahan-pic rounded-pill"
        title={TranslatePlaceholder("My Account")}
      />
    }
  >
    <NavDropdown.Item
      eventKey={4.1}
      as={NavLink}
      activeclassname="active"
      to="/myaccount/orders"
    >
      <Icofont icon="food-cart" /> <Translate>Orders</Translate>
    </NavDropdown.Item>
    {customerId && !isMainSite && (
      <NavDropdown.Item
        eventKey={4.3}
        as={NavLink}
        activeclassname="active"
        to="/myaccount/favourites"
      >
        <Icofont icon="heart" /> <Translate>Favourites</Translate>
      </NavDropdown.Item>
    )}
    <NavDropdown.Item
      eventKey={4.5}
      as={NavLink}
      activeclassname="active"
      to="/myaccount/addresses"
    >
      <Icofont icon="location-pin" /> <Translate>Addresses</Translate>
    </NavDropdown.Item>
  </NavDropdown>
);
const mapStateToProps = createStructuredSelector({
  customerId: selectCustomerId,
  isMainSite: selectIsMainSite,
});
export default connect(mapStateToProps)(HeaderMyAccount);
