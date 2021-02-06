import { Container, Image, Navbar } from "react-bootstrap";
import {
  selectCustomerInfo,
  selectCustomerInfoIsFetching,
  selectIsMainSite,
} from "../../redux/customer/customer.reselect";

import Loading from "../common/loading.component";
import LoginUser from "./login-header.component";
import NonloginUser from "./nonlogin-header.component";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { logout } from "../../redux/auth/auth.actions";
import { selectLoginCompleted } from "../../redux/auth/auth.reselect";

class Header extends React.Component {
  render() {
    const {
      customerInfo,
      isCustomerInfoFetching,
      loginCompleted,
      isMainSite,
    } = this.props;
    return isCustomerInfoFetching && !isMainSite ? (
      <Loading />
    ) : (
      <div ref={(node) => (this.node = node)}>
        <Navbar
          color="light"
          expand="lg"
          className="navbar-light osahan-nav shadow-sm"
        >
          <Container>
            <Navbar.Brand to="/">
              <Image
                src={`http://206.189.55.20:8080/preview/276ce05d-837b-4aa1-8f6f-ff02597a0e01/sf/x_file?_fai=${
                  isMainSite ? "75" : customerInfo.logo_path
                }`}
                alt=""
              />
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse id="navbarNavDropdown"></Navbar.Collapse>
            {loginCompleted ? (
              <LoginUser logout={logout} isMainSite={isMainSite} />
            ) : (
              <NonloginUser />
            )}
          </Container>
        </Navbar>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  isCustomerInfoFetching: selectCustomerInfoIsFetching,
  customerInfo: selectCustomerInfo,
  loginCompleted: selectLoginCompleted,
  isMainSite: selectIsMainSite,
});
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
