import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "react-select2-wrapper/css/select2.css";
import "./App.css";

import * as customerActions from "./redux/actions/customerActions";
import * as customerStatus from "./enums/CustomerStatusEnums";

import { Route, Switch } from "react-router-dom";

import Checkout from "./components/Checkout";
import { CurrentCustomerId } from "./components/Helper";
import Detail from "./components/Detail";
import Extra from "./components/Extra";
import Footer from "./components/common/Footer";
import ForgotPassword from "./components/ForgotPassword";
import Header from "./components/common/Header";
import Invoice from "./components/Invoice";
import Kios from "./components/common/Kios";
import List from "./components/List";
import Login from "./components/Login";
import MyAccount from "./components/MyAccount";
import NotFound from "./components/NotFound";
import Offers from "./components/Offers";
import React from "react";
import Register from "./components/Register";
import Thanks from "./components/Thanks";
import TrackOrder from "./components/TrackOrder";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class App extends React.Component {
  componentDidMount() {
    if (this.props.customerInfo.length === undefined) {
      this.props.actions.loadCustomerInfo(CurrentCustomerId());
    }
  }
  render() {
    const { customerInfo } = this.props;
    return (
      <>
        {this.props.location.pathname !== "/login" &&
        this.props.location.pathname !== "/register" &&
        this.props.location.pathname !== "/kios" &&
        customerInfo.customer_status === customerStatus.OPEN ? (
          <Header />
        ) : (
          ""
        )}
        <Switch>
          {/* <Route path="/" exact component={Index} /> */}
          <Route path="/" exact component={Detail} />
          {/* {customerInfo.customer_status === customerStatus.OPEN ? (
          ) : (
            <Route path="/" exact component={NotFound} />
          )} */}

          <Route path="/offers" exact component={Offers} />
          <Route path="/kios" exact component={Kios} />
          <Route path="/listing" exact component={List} />
          <Route path="/myaccount" component={MyAccount} />
          <Route path="/404" exact component={NotFound} />
          <Route path="/extra" exact component={Extra} />
          <Route path="/login" exact component={Login} />
          <Route path="/forgot-password" exact component={ForgotPassword} />
          <Route path="/register" exact component={Register} />
          <Route path="/track-order" exact component={TrackOrder} />
          <Route path="/invoice" exact component={Invoice} />
          <Route path="/checkout" exact component={Checkout} />
          <Route path="/thanks" exact component={Thanks} />
          <Route exact component={NotFound} />
        </Switch>
        {this.props.location.pathname !== "/login" &&
        this.props.location.pathname !== "/register" &&
        this.props.location.pathname !== "/kios" &&
        customerInfo.customer_status === customerStatus.OPEN ? (
          <Footer />
        ) : (
          ""
        )}
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    customerInfo: state.customerInfoReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCustomerInfo: bindActionCreators(
        customerActions.loadCustomerInfoRequest,
        dispatch
      ),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
