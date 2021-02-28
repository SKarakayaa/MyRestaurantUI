import GoHomeButton from "../buttons/go-home-button.component";
import HeaderCart from "./header-cart.component";
import HeaderMyAccount from "./header-myaccount.component";
import { Nav } from "react-bootstrap";
import React from "react";
import Translate from "../../utilities/translator";
import { connect } from "react-redux";
import { logout } from "../../redux/auth/auth.actions";

const LoginUser = ({ logout, isMainSite }) => (
  <Nav activeKey={0} className="ml-auto">
    <GoHomeButton />
    <HeaderMyAccount />
    {!isMainSite && <HeaderCart />}
    <Nav.Link to="/login" onClick={() => logout()}>
      <Translate>Logout</Translate>
    </Nav.Link>
  </Nav>
);
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});
export default connect(null, mapDispatchToProps)(LoginUser);
