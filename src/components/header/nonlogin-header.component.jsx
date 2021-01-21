import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import React from "react";

const NonloginUser = () => (
  <Nav activeKey={0} className="ml-auto">
    <Nav.Link eventKey={1} as={NavLink} exact to="/">
      Home
    </Nav.Link>
    <Nav.Link eventKey={1} as={NavLink} exact to="/login">
      Login
    </Nav.Link>
    <Nav.Link
      eventKey={2}
      as={NavLink}
      activeclassname="active"
      exact
      to="/register"
    >
      Register <span className="sr-only">(current)</span>
    </Nav.Link>
  </Nav>
);
export default NonloginUser;
