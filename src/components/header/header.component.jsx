import { Container, Image, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import {
  selectCustomerInfo,
  selectCustomerInfoIsFetching,
} from "../../redux/customer/customer.reselect";

import { CurrentCustomerId } from "../../componentsold/Helper";
import DropDownTitle from "../common/dropdown-title.component";
import Icofont from "react-icofont";
import Loading from "../common/loading.component";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchCustomerInfoStartAsync } from "../../redux/customer/customer.actions";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavExpanded: false,
    };
  }
  setIsNavExpanded = (isNavExpanded) => {
    this.setState({ isNavExpanded: isNavExpanded });
  };
  closeMenu = () => {
    this.setState({ isNavExpanded: false });
  };

  handleClick = (e) => {
    if (this.node.contains(e.target)) {
      // if clicked inside menu do something
    } else {
      // If clicked outside menu, close the navbar.
      this.setState({ isNavExpanded: false });
    }
  };

  componentDidMount() {
    const { fetchCustomerInfoStartAsync } = this.props;
    fetchCustomerInfoStartAsync(CurrentCustomerId());
    // this.props.actions.loadCurrentUser();
    // this.props.actions.loadCustomerInfo(CurrentCustomerId());
    document.addEventListener("click", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick, false);
  }

  logonUser = () => {
    return (
      <Nav activeKey={0} className="ml-auto" onSelect={this.closeMenu}>
        <Nav.Link eventKey={1} as={NavLink} exact to="/">
          Home
        </Nav.Link>
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
        <NavDropdown
          activeclassname="active"
          alignRight
          className="dropdown-cart"
          title={
            <DropDownTitle
              className="d-inline-block"
              faIcon="shopping-basket"
              iconClass="mr-1"
              title="Cart"
              badgeClass="ml-1"
              badgeVariant="success"
              badgeValue="5"
            />
          }
        >
          <div className="dropdown-cart-top shadow-sm">
            <div className="dropdown-cart-top-body border-top p-4">
              {/* {cart.length === 0
                ? "Cart is empty"
                : cart.map((cartItem, index) => (
                    <CartDropdownItem
                      icoIcon="ui-press"
                      key={index}
                      iconClass="text-success food-item"
                      title={cartItem.product.name + " x " + cartItem.quantity}
                      price={
                        cartItem.subTotal + " " + customerInfo.currency_unit
                      }
                    />
                  ))} */}
            </div>
            <div className="dropdown-cart-top-footer border-top p-4">
              <p className="mb-0 font-weight-bold text-secondary">
                Sub Total{" "}
                <span className="float-right text-dark">
                  {/* {this.totalPrice() + " " + customerInfo.currency_unit} */}
                </span>
              </p>
              <small className="text-info">Extra charges may apply</small>
            </div>
            <div className="dropdown-cart-top-footer border-top p-2">
              <NavDropdown.Item
                eventKey={5.1}
                as={Link}
                className="btn btn-success btn-block py-3 text-white text-center dropdown-item"
                to="/checkout"
              >
                {" "}
                Checkout
              </NavDropdown.Item>
            </div>
          </div>
        </NavDropdown>
        <Nav.Link to="/">Logout</Nav.Link>
      </Nav>
    );
  };
  unlogonUser = () => {
    return (
      <Nav activeKey={0} className="ml-auto" onSelect={this.closeMenu}>
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
  };
  render() {
    const { customerInfo, isCustomerInfoFetching } = this.props;
    return isCustomerInfoFetching ? (
      <Loading />
    ) : (
      <div ref={(node) => (this.node = node)}>
        <Navbar
          onToggle={this.setIsNavExpanded}
          expanded={this.state.isNavExpanded}
          color="light"
          expand="lg"
          className="navbar-light osahan-nav shadow-sm"
        >
          <Container>
            <Navbar.Brand to="/">
              <Image
                src={`http://206.189.55.20:8080/preview/276ce05d-837b-4aa1-8f6f-ff02597a0e01/sf/x_file?_fai=${customerInfo.logo_path}`}
                alt=""
              />
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse id="navbarNavDropdown"></Navbar.Collapse>
            {/* {Object.keys(currentUser).length === 0
              ? this.unlogonUser()
              : this.logonUser()} */}
            {this.unlogonUser()}
          </Container>
        </Navbar>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  isCustomerInfoFetching: selectCustomerInfoIsFetching,
  customerInfo: selectCustomerInfo,
});
const mapDispatchToProps = (dispatch) => ({
  fetchCustomerInfoStartAsync: (customerid) =>
    dispatch(fetchCustomerInfoStartAsync(customerid)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
