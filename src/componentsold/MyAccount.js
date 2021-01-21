import * as productActions from "../redux/actions/productActions";
import * as userActions from "../redux/actions/userActions";

import { Col, Container, Image, Row } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

import Addresses from "./myaccount/Addresses";
import EditProfileModal from "./modals/EditProfileModal";
import Favourites from "./myaccount/Favourites";
import IsLogin from "./Helper";
import Orders from "./myaccount/Orders";
import Payments from "./myaccount/Payments";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class MyAccount extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showEditProfile: false,
    };
  }
  hideEditProfile = () => this.setState({ showEditProfile: false });
  componentDidMount() {
    this.props.actions.loadCurrentUser();
    if (IsLogin() && Object.keys(this.props.userInfo).length === 0) {
      this.props.actions.loadUserInfo();
    }
    if (this.props.products.length === 0) {
      this.props.actions.loadProducts(1);
    }
  }
  render() {
    const { userInfo } = this.props;
    return IsLogin() ? (
      <>
        {this.state.showEditProfile ? (
          <EditProfileModal
            show={this.state.showEditProfile}
            onHide={this.hideEditProfile}
            userInfo={userInfo}
          />
        ) : (
          ""
        )}

        <section className="section pt-4 pb-4 osahan-account-page">
          <Container>
            <Row>
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
                        {Object.keys(userInfo).length !== 0 ? (
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
                              <Link
                                to="#"
                                onClick={() =>
                                  this.setState({ showEditProfile: true })
                                }
                                className="text-primary mr-3"
                              >
                                <i className="icofont-ui-edit"></i> EDIT
                              </Link>
                            </p>
                          </div>
                        ) : (
                          ""
                        )}
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
              <Col md={9}>
                <Switch>
                  <Route path="/myaccount/orders" exact component={Orders} />
                  {/* <Route path="/myaccount/offers" exact component={Offers} /> */}
                  <Route
                    path="/myaccount/favourites"
                    exact
                    component={Favourites}
                  />
                  <Route
                    path="/myaccount/payments"
                    exact
                    component={Payments}
                  />
                  <Route
                    path="/myaccount/addresses"
                    exact
                    component={Addresses}
                  />
                </Switch>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    ) : (
      ""
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUserReducer,
    userInfo: state.userInfoReducer,
    products: state.productReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCurrentUser: bindActionCreators(userActions.getCurrentUser, dispatch),
      loadUserInfo: bindActionCreators(
        userActions.loadUserInfoRequest,
        dispatch
      ),
      loadProducts: bindActionCreators(
        productActions.loadProductsRequest,
        dispatch
      ),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);