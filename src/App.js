import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "react-select2-wrapper/css/select2.css";
import "./App.css";

import { Route, Switch } from "react-router-dom";

// import Checkout from "./componentsold/Checkout";
// import { CurrentCustomerId } from "./componentsold/Helper";
// import Detail from "./componentsold/Detail";
import Detail from "./pages/detail.pages";
// import Extra from "./componentsold/Extra";
// import Footer from "./componentsold/common/Footer";
// import ForgotPassword from "./componentsold/ForgotPassword";
// import { Fragment } from "react";
// import Header from "./componentsold/common/Header";
import Header from "./components/header/header.component";
// import Index from "./componentsold/Index";
// import Invoice from "./componentsold/Invoice";
// import Kios from "./componentsold/common/Kios";
// import List from "./componentsold/List";
// import Login from "./componentsold/Login";
import Login from "./pages/login.pages";
// import MyAccount from "./componentsold/MyAccount";
// import NotFound from "./componentsold/NotFound";
// import Offers from "./componentsold/Offers";
import React from "react";

// import * as customerActions from "./redux/actions/customerActions";
// import * as customerStatus from "./enums/CustomerStatusEnums";

// import Register from "./componentsold/Register";
// import Thanks from "./componentsold/Thanks";
// import TrackOrder from "./componentsold/TrackOrder";
// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";

class App extends React.Component {
  state = {
    isMainSite: true,
  };
  // componentDidMount() {
  //   if (this.props.customerInfo.length === undefined) {
  //     this.props.actions.loadCustomerInfo(CurrentCustomerId());
  //   }
  // }
  render() {
    // const { customerInfo } = this.props;
    return (
      <>
        {this.props.location.pathname !== "/login" &&
        this.props.location.pathname !== "/register" ? (
          <Header />
        ) : (
          ""
        )}
        <Switch>
          <Route path="/" exact component={Detail} />
          <Route path="/login" exact component={Login} />
        </Switch>
        {/* {this.props.location.pathname !== "/login" &&
        this.props.location.pathname !== "/register" &&
        this.props.location.pathname !== "/kios" &&
        customerInfo.customer_status === customerStatus.OPEN ? (
          <Header />
        ) : (
          ""
        )}
        <Switch>
          {this.state.isMainSite ? (
            <Fragment>
              <Route path="/" exact component={Index} />
              <Route path="/listing" exact component={List} />
              <Route path="/detail/:id" exact component={Detail} />
            </Fragment>
          ) : (
            <Fragment>
              {" "}
              <Route path="/" exact component={Detail} />
            </Fragment>
          )}

          <Route path="/offers" exact component={Offers} />
          <Route path="/kios" exact component={Kios} />
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
        )} */}
      </>
    );
  }
}
// function mapStateToProps(state) {
//   return {
//     customerInfo: state.customerInfoReducer,
//   };
// }
// function mapDispatchToProps(dispatch) {
//   return {
//     actions: {
//       loadCustomerInfo: bindActionCreators(
//         customerActions.loadCustomerInfoRequest,
//         dispatch
//       ),
//     },
//   };
// }
export default App;
