import { Container, Row } from "react-bootstrap";
import {
  selectIsFetchingUserInfo,
  selectUserInfo,
} from "../../redux/user/user.reselect";

import AuthHelper from "../../helpers/authHelper";
import MyAccountBody from "../../components/myaccount/myaccount-body.component";
import MyAccountSidebar from "../../components/myaccount/myaccount-sidebar.component";
import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchUserInfoStartAsync } from "../../redux/user/user.actions.js";
import { selectLoginCompleted } from "../../redux/auth/auth.reselect";

class MyAccount extends React.Component {
  componentDidMount() {
    const userid = AuthHelper.GetCurrentUser().userId;
    const { loadUserInfo } = this.props;
    loadUserInfo(userid);
  }
  render() {
    const { loginCompleted, userInfo, userInfoIsFetching } = this.props;
    console.log("user info :", userInfo);
    return !loginCompleted ? (
      <Redirect to="/login" />
    ) : (
      <>
        <section className="section pt-4 pb-4 osahan-account-page">
          <Container>
            <Row>
              {!userInfoIsFetching && <MyAccountSidebar />}
              <MyAccountBody />
            </Row>
          </Container>
        </section>
      </>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  userInfoIsFetching: selectIsFetchingUserInfo,
  userInfo: selectUserInfo,
  loginCompleted: selectLoginCompleted,
});
const mapDispatchToProps = (dispatch) => ({
  loadUserInfo: (userid) => dispatch(fetchUserInfoStartAsync(userid)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
