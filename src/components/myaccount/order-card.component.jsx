import { Image, Media } from "react-bootstrap";

import AddressHelper from "../../helpers/addressHelper";
import Icofont from "react-icofont";
import { Link } from "react-router-dom";
import OrderDetailButton from "../buttons/order-detail-button.component";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCustomerInfo } from "../../redux/customer/customer.reselect";
import { selectUserAddresses } from "../../redux/user/user.reselect";

const OrderCard = ({ order, index, customerInfo, userAddresses }) => (
  <div className="bg-white card mb-4 order-list shadow-sm">
    <div className="gold-members p-4">
      <Media>
        <Image className="mr-4" src="/img/3.jpg" alt="image" />
        <Media.Body>
          {order.send_date !== "" ? (
            <span className="float-right text-info">
              Delivered on {order.send_date}
              <Icofont icon="check-circled" className="text-success ml-1" />
            </span>
          ) : (
            ""
          )}
          <h6 className="mb-2">
            <Link to="/detail" className="text-black">
              {"ORDER #" + (parseInt(index) + 1)}
            </Link>
          </h6>
          <p className="text-gray mb-1">
            <Icofont icon="location-arrow" />
            {AddressHelper.GetAddress(userAddresses, order.address_id)}
          </p>
          <p className="text-gray mb-3">
            <Icofont icon="list" /> ORDER #{order.orderNumber}
            <Icofont icon="clock-time" className="ml-2" /> {order.order_date}
          </p>
          {/* <p className="text-dark">ORDER PRODUCTS</p> */}
          <hr />
          <div className="float-right">
            <Link className="btn btn-sm btn-outline-primary mr-1" to="#">
              <Icofont icon="headphone-alt" /> HELP
            </Link>
            <OrderDetailButton orderid={order.frm_orders_id} />
          </div>
          <p className="mb-0 text-black text-primary pt-2">
            <span className="text-black font-weight-bold"> Total Paid:</span>{" "}
            {order.total_price} {customerInfo.currency_unit}
          </p>
        </Media.Body>
      </Media>
    </div>
  </div>
);
const mapStateToProps = createStructuredSelector({
  customerInfo: selectCustomerInfo,
  userAddresses: selectUserAddresses,
});
export default connect(mapStateToProps)(OrderCard);
