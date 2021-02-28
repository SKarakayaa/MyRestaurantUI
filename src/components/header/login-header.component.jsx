import GoHomeButton from "../buttons/go-home-button.component";
import HeaderCart from "./header-cart.component";
import HeaderMyAccount from "./header-myaccount.component";
import { Nav } from "react-bootstrap";
import React from "react";
import Translate from "../../utilities/translator";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { logout } from "../../redux/auth/auth.actions";
import { selectCustomerId } from "../../redux/customer/customer.reselect";

const LoginUser = ({ logout, customerId }) => (
  <Nav activeKey={0} className="ml-auto">
    <GoHomeButton />
    <HeaderMyAccount />
    {customerId && <HeaderCart />}
    <Nav.Link to="#" onClick={() => logout()}>
      <Translate>Logout</Translate>
    </Nav.Link>
  </Nav>
);
const mapStateToProps = createStructuredSelector({
  customerId: selectCustomerId,
});
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginUser);
