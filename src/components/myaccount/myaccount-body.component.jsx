import { Route, Switch } from "react-router-dom";

import { Col } from "react-bootstrap";
import Orders from "../../pages/myaccount/orders.page";
import React from "react";

const MyAccountBody = () => (
  <Col md={9}>
    <Switch>
      <Route path="/myaccount/orders" exact component={Orders} />
      {/* <Route path="/myaccount/offers" exact component={Offers} /> */}
      <Route path="/myaccount/favourites" exact />
      <Route path="/myaccount/payments" exact />
      <Route path="/myaccount/addresses" exact />
    </Switch>
  </Col>
);
export default MyAccountBody;
