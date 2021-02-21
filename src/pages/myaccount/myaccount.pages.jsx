import { Container, Row } from "react-bootstrap";
import {
  fetchUserAddressesStartAsync,
  fetchUserInfoStartAsync,
} from "../../redux/user/user.actions.js";
import {
  selectAreAddressesFetching,
  selectIsFetchingUserInfo,
} from "../../redux/user/user.reselect";

import AuthHelper from "../../helpers/authHelper";
import MyAccountBody from "../../components/myaccount/myaccount-body.component";
import MyAccountSidebar from "../../components/myaccount/myaccount-sidebar.component";
import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchCustomerInfoStartAsync } from "../../redux/customer/customer.actions";
import { fetchProductStartAsync } from "../../redux/product/product.actions";
import { selectAreFethingProducts } from "../../redux/product/product.reselect";
import { selectCustomerId } from "../../redux/customer/customer.reselect";
import { selectCustomerInfoIsFetching } from "../../redux/customer/customer.reselect";
import { selectLoginCompleted } from "../../redux/auth/auth.reselect";

class MyAccount extends React.Component {
  componentDidMount() {
    const userid = AuthHelper.GetCurrentUser().userId;
    const {
      loadUserInfo,
      loadCustomerInfo,
      loadUserAddresses,
      loadProducts,
      customerId,
    } = this.props;

    loadUserInfo(userid);
    loadUserAddresses(userid);
    if (customerId !== null) {
      loadCustomerInfo(customerId);
      loadProducts(customerId);
    }
  }
  render() {
    const {
      loginCompleted,
      userInfoIsFetching,
      customerInfoIsFetching,
      userAddressesAreFetching,
      productsAreFetching,
    } = this.props;
    return !loginCompleted ? (
      <Redirect to="/login" />
    ) : (
      <>
        <section className="section pt-4 pb-4 osahan-account-page">
          <Container>
            {!userInfoIsFetching &&
              !userAddressesAreFetching &&
              !customerInfoIsFetching &&
              !productsAreFetching && (
                <Row>
                  <MyAccountSidebar />
                  <MyAccountBody />
                </Row>
              )}
          </Container>
        </section>
      </>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  userInfoIsFetching: selectIsFetchingUserInfo,
  loginCompleted: selectLoginCompleted,
  customerInfoIsFetching: selectCustomerInfoIsFetching,
  userAddressesAreFetching: selectAreAddressesFetching,
  productsAreFetching: selectAreFethingProducts,
  customerId: selectCustomerId,
});
const mapDispatchToProps = (dispatch) => ({
  loadUserInfo: (userid) => dispatch(fetchUserInfoStartAsync(userid)),
  loadCustomerInfo: (customerid) =>
    dispatch(fetchCustomerInfoStartAsync(customerid)),
  loadUserAddresses: (customerid, userid) =>
    dispatch(fetchUserAddressesStartAsync(customerid, userid)),
  loadProducts: (customerid) => dispatch(fetchProductStartAsync(customerid)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
