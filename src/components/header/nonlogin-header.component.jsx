import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import React from "react";
import Translate from '../../utilities/translator';

const NonloginUser = () => (
  <Nav activeKey={0} className="ml-auto">
    <Nav.Link eventKey={1} as={NavLink} exact to="/">
      <Translate>Home</Translate>
    </Nav.Link>
    <Nav.Link eventKey={1} as={NavLink} exact to="/login">
      <Translate>Login</Translate>
    </Nav.Link>
    <Nav.Link
      eventKey={2}
      as={NavLink}
      activeclassname="active"
      exact
      to="/register"
    >
      <Translate>Register</Translate> <span className="sr-only">(current)</span>
    </Nav.Link>
  </Nav>
);
export default NonloginUser;
