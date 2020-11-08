import * as userActions from "../../redux/actions/userActions";

import {
  Container,
  Image,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

import CartDropdownItem from "../cart/CartDropdownItem";
import DropDownTitle from "../common/DropDownTitle";
import Icofont from "react-icofont";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

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
    this.props.actions.loadCurrentUser();
    document.addEventListener("click", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick, false);
  }
  totalPrice = () => {
    let totalPrice = 0;
    this.props.cart.map(
      (cartItem) => (totalPrice += cartItem.quantity * cartItem.product.price)
    );
    return totalPrice;
  };
  Logout = () => {
    this.props.actions.logout();
    window.location.reload();
  };
  logonUser = () => {
    const { cart } = this.props;
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
            eventKey={4.2}
            as={NavLink}
            activeclassname="active"
            to="/myaccount/offers"
          >
            <Icofont icon="sale-discount" /> Offers
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
            eventKey={4.4}
            as={NavLink}
            activeclassname="active"
            to="/myaccount/payments"
          >
            <Icofont icon="credit-card" /> Payments
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
              badgeValue={cart.length}
            />
          }
        >
          <div className="dropdown-cart-top shadow-sm">
            <div className="dropdown-cart-top-body border-top p-4">
              {cart.length === 0
                ? "Cart is empty"
                : cart.map((cartItem) => (
                    <CartDropdownItem
                      icoIcon="ui-press"
                      iconClass="text-success food-item"
                      title={cartItem.product.name + " * " + cartItem.quantity}
                      price={cartItem.product.price * cartItem.quantity + " £"}
                    />
                  ))}
            </div>
            <div className="dropdown-cart-top-footer border-top p-4">
              <p className="mb-0 font-weight-bold text-secondary">
                Sub Total{" "}
                <span className="float-right text-dark">
                  {this.totalPrice()} £
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
        <Nav.Link onClick={() => this.Logout()} to="/">Logout</Nav.Link>
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
    const { currentUser } = this.props;
    return (
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
              <Image src="/img/logo.png" alt="" />
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse id="navbarNavDropdown"></Navbar.Collapse>
            {Object.keys(currentUser).length === 0
              ? this.unlogonUser()
              : this.logonUser()}
          </Container>
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUserReducer,
    cart: state.cartReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCurrentUser: bindActionCreators(userActions.getCurrentUser, dispatch),
      logout: bindActionCreators(userActions.logout, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
