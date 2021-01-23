import { Col, Image } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserInfo } from "../../redux/user/user.reselect";

const MyAccountSidebar = ({ userInfo }) => (
  <Col md={3}>
    <div className="osahan-account-page-left shadow-sm bg-white h-100">
      <div className="border-bottom p-4">
        <div className="osahan-user text-center">
          <div className="osahan-user-media">
            <Image
              className="mb-3 rounded-pill shadow-sm mt-1"
              src="/img/user/4.png"
              alt="gurdeep singh osahan"
            />
            <div className="osahan-user-media-body">
              <h6 className="mb-2">{userInfo.full_name}</h6>
              <p className="mb-1">
                {userInfo.phone !== ""
                  ? userInfo.phone
                  : "You have no phone number !"}
              </p>
              <p>
                {userInfo.email !== ""
                  ? userInfo.email
                  : "You have no email address !"}
              </p>
              <p className="mb-0 text-black font-weight-bold">
                <Link to="#" className="text-primary mr-3">
                  <i className="icofont-ui-edit"></i> EDIT
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ul className="nav flex-column border-0 pt-4 pl-4 pb-4">
        <li className="nav-item">
          <NavLink
            className="nav-link"
            activeClassName="active"
            exact
            to="/myaccount/orders"
          >
            <i className="icofont-food-cart"></i> Orders
          </NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink
            className="nav-link"
            activeClassName="active"
            exact
            to="/myaccount/offers"
          >
            <i className="icofont-sale-discount"></i> Offers
          </NavLink>
        </li> */}
        <li className="nav-item">
          <NavLink
            className="nav-link"
            activeClassName="active"
            exact
            to="/myaccount/favourites"
          >
            <i className="icofont-heart"></i> Favourites
          </NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink
            className="nav-link"
            activeClassName="active"
            exact
            to="/myaccount/payments"
          >
            <i className="icofont-credit-card"></i> Payments
          </NavLink>
        </li> */}
        <li className="nav-item">
          <NavLink
            className="nav-link"
            activeClassName="active"
            exact
            to="/myaccount/addresses"
          >
            <i className="icofont-location-pin"></i> Addresses
          </NavLink>
        </li>
      </ul>
    </div>
  </Col>
);
const mapStateToProps = createStructuredSelector({
  userInfo: selectUserInfo,
});
export default connect(mapStateToProps)(MyAccountSidebar);
