import HeaderCart from "./header-cart.component";
import HeaderMyAccount from "./header-myaccount.component";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import React from "react";
import Translate from "../../utilities/translator";
import { connect } from "react-redux";
import { logout } from "../../redux/auth/auth.actions";

const LoginUser = ({ logout }) => (
  <Nav activeKey={0} className="ml-auto">
    <Nav.Link eventKey={1} as={NavLink} exact to="/">
      <Translate lang={"tr"}>Home</Translate>
    </Nav.Link>
    <HeaderMyAccount />
    <HeaderCart />
    <Nav.Link to="/login" onClick={() => logout()}>
      <Translate lang={"tr"}>Logout</Translate>
    </Nav.Link>
  </Nav>
);
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});
export default connect(null, mapDispatchToProps)(LoginUser);
