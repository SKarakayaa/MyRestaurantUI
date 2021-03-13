import { Card, ListGroup } from "react-bootstrap";

import Icofont from "react-icofont";
import OrderHelper from "../../helpers/orderHelper";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserOrders } from "../../redux/main/main.reselect";

const CurrentOrders = ({ userOrders }) => (
  <div style={{ marginTop: "5rem" }}>
    <Card style={{ width: "25rem", height: "18rem" }} border="info">
      <Card.Header className="text-center">
        <b>Siparişlerim</b>
      </Card.Header>
      <ListGroup>
        {userOrders &&
          userOrders.map((order) => {
            const iconOptions = OrderHelper.GetOrderStatusIcon(
              order.order_status_id
            );
            return (
              <ListGroup.Item key={order.frm_orders_id}>
                Order Number #{order.order_number} - {order.order_status_id_qw_}
                <Icofont
                  icon={iconOptions.icon}
                  className={`icofont-2x pull-right ${iconOptions.class}`}
                />
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    </Card>
  </div>
);
const mapStateToProps = createStructuredSelector({
  userOrders: selectUserOrders,
});
export default connect(mapStateToProps)(CurrentOrders);
