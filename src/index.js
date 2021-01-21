import "alertifyjs/build/css/alertify.css";
import "./index.css";

import * as serviceWorker from "./serviceWorker";

import { Route, Router } from "react-router-dom";

import App from "./App";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
// import configureStore from "./redux/reducers/configureStore";
import history from "./componentsold/history";
import { store } from "./redux/store";

// "proxy": "http://206.189.55.20:8080/rest/276ce05d-837b-4aa1-8f6f-ff02597a0e01",

// const store = configureStore();
ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <Route path="/" component={App} />
    </Provider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
