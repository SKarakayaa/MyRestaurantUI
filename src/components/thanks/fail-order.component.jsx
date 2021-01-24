import { Col, Image } from "react-bootstrap";

import { Link } from "react-router-dom";
import React from "react";

const FailOrder = ({ orderErrorMessage }) => (
  <Col md={12} className="text-center pt-5 pb-5">
    <Image className="img-fluid" src="/img/404.png" alt="404" />
    <h1 className="mt-2 mb-2">Oopps !...</h1>
    <p className="mb-5">
      There is an problem when creating order. Problem Detail :{" "}
      {orderErrorMessage}
    </p>
    <Link className="btn btn-primary btn-lg" to="/myaccount/orders">
      GO ORDERS
    </Link>
  </Col>
);
export default FailOrder;
