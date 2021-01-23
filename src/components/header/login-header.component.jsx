import HeaderCart from "./header-cart.component";
import HeaderMyAccount from "./header-myaccount.component";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/auth/auth.actions";

const LoginUser = ({ logout }) => (
  <Nav activeKey={0} className="ml-auto">
    <Nav.Link eventKey={1} as={NavLink} exact to="/">
      Home
    </Nav.Link>
    <HeaderMyAccount />
    <HeaderCart />
    <Nav.Link to="/login" onClick={() => logout()}>
      Logout
    </Nav.Link>
  </Nav>
);
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});
export default connect(null, mapDispatchToProps)(LoginUser);
