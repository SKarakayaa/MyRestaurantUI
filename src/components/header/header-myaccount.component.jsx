import DropDownTitle from "../common/dropdown-title.component";
import Icofont from "react-icofont";
import { NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import React from "react";
import Translate from "../../utilities/translator";

const HeaderMyAccount = () => (
  <NavDropdown
    alignRight
    title={
      <DropDownTitle
        className="d-inline-block"
        image="img/user/4.png"
        imageAlt="user"
        imageClass="nav-osahan-pic rounded-pill"
        title={<Translate >My Account</Translate>}
      />
    }
  >
    <NavDropdown.Item
      eventKey={4.1}
      as={NavLink}
      activeclassname="active"
      to="/myaccount/orders"
    >
      <Icofont icon="food-cart" /> <Translate >Orders</Translate>
    </NavDropdown.Item>

    <NavDropdown.Item
      eventKey={4.3}
      as={NavLink}
      activeclassname="active"
      to="/myaccount/favourites"
    >
      <Icofont icon="heart" /> <Translate >Favourites</Translate>
    </NavDropdown.Item>

    <NavDropdown.Item
      eventKey={4.5}
      as={NavLink}
      activeclassname="active"
      to="/myaccount/addresses"
    >
      <Icofont icon="location-pin" /> <Translate >Addresses</Translate>
    </NavDropdown.Item>
  </NavDropdown>
);
export default HeaderMyAccount;
