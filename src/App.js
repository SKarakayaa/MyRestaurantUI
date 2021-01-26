import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "react-select2-wrapper/css/select2.css";
import "./App.css";

import { Route, Switch } from "react-router-dom";

import Checkout from "./pages/checkout.pages";
import Detail from "./pages/detail.pages";
import Header from "./components/header/header.component";
import Login from "./pages/login.pages";
import MyAccount from "./pages/myaccount/myaccount.pages";
import React from "react";
import Register from "./pages/register.pages";
import Thanks from "./pages/thanks.pages";
import { connect } from "react-redux";
import { fetchCitiesStartAsync } from "./redux/address/address.actions";

class App extends React.Component {
  state = {
    isMainSite: true,
  };
  componentDidMount() {
    const { loadCities } = this.props;
    loadCities();
  }
  render() {
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
          <Route path="/register" exact component={Register} />
          <Route path="/myaccount" component={MyAccount} />
          <Route path="/checkout" exact component={Checkout} />
          <Route path="/thanks" exact component={Thanks} />
        </Switch>
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  loadCities: () => dispatch(fetchCitiesStartAsync()),
});
export default connect(null, mapDispatchToProps)(App);
