import { Route, Switch } from "react-router-dom";

import Address from "../../pages/myaccount/address.pages";
import { Col } from "react-bootstrap";
import Favorites from "../../pages/myaccount/favorites.pages";
import Orders from "../../pages/myaccount/orders.pages";
import React from "react";

const MyAccountBody = () => (
  <Col md={9}>
    <Switch>
      <Route path="/myaccount/orders" exact component={Orders} />
      <Route path="/myaccount/favourites" exact component={Favorites} />
      <Route path="/myaccount/addresses" exact component={Address} />
    </Switch>
  </Col>
);
export default MyAccountBody;
