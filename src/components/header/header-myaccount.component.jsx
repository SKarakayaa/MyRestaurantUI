import DropDownTitle from "../common/dropdown-title.component";
import Icofont from "react-icofont";
import { NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import React from "react";

const HeaderMyAccount = () => (
  <NavDropdown
    alignRight
    title={
      <DropDownTitle
        className="d-inline-block"
        image="img/user/4.png"
        imageAlt="user"
        imageClass="nav-osahan-pic rounded-pill"
        title="My Account"
      />
    }
  >
    <NavDropdown.Item
      eventKey={4.1}
      as={NavLink}
      activeclassname="active"
      to="/myaccount/orders"
    >
      <Icofont icon="food-cart" /> Orders
    </NavDropdown.Item>

    <NavDropdown.Item
      eventKey={4.3}
      as={NavLink}
      activeclassname="active"
      to="/myaccount/favourites"
    >
      <Icofont icon="heart" /> Favourites
    </NavDropdown.Item>

    <NavDropdown.Item
      eventKey={4.5}
      as={NavLink}
      activeclassname="active"
      to="/myaccount/addresses"
    >
      <Icofont icon="location-pin" /> Addresses
    </NavDropdown.Item>
  </NavDropdown>
);
export default HeaderMyAccount;
