import { Link, NavLink } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";

import DropDownTitle from "../common/dropdown-title.component";
import Icofont from "react-icofont";
import React from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/auth/auth.actions";

const LoginUser = ({ logout }) => (
  <Nav activeKey={0} className="ml-auto">
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
          badgeValue={5}
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
            Checkout
          </NavDropdown.Item>
        </div>
      </div>
    </NavDropdown>
    <Nav.Link to="/login" onClick={() => logout()}>
      Logout
    </Nav.Link>
  </Nav>
);
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});
export default connect(null, mapDispatchToProps)(LoginUser);
