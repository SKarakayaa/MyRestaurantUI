import { Col, Image } from "react-bootstrap";

import { Link } from "react-router-dom";
import OrderDetail from "../common/order-detail.component";
import React from "react";
import Translate from "../../utilities/translator";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectLastOrder } from "../../redux/order/order.reselect";

const SuccessOrder = ({ lastOrder }) => (
  <>
    <Col md={12} className="text-center pt-5 pb-5">
      <Image className="img-fluid" src="/img/thanks.png" alt="404" />
      <h1 className="mt-2 mb-2">
        <Translate>Congratulations</Translate>
      </h1>
    </Col>
    <OrderDetail lastOrder={lastOrder} />
    <Col md={12} className="text-center pt-5 pb-5">
      <Link className="btn btn-primary btn-lg" to="/myaccount/orders">
        <Translate>GO ORDERS</Translate>
      </Link>
    </Col>
  </>
);
const mapStateToProps = createStructuredSelector({
  lastOrder: selectLastOrder,
});
export default connect(mapStateToProps)(SuccessOrder);
