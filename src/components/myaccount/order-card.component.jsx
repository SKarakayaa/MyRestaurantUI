import { Image, Media } from "react-bootstrap";

import AddressHelper from "../../helpers/addressHelper";
import Icofont from "react-icofont";
import OrderDetailButton from "../buttons/order-detail-button.component";
import React from "react";
import Translate from "../../utilities/translator";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCustomerInfo } from "../../redux/customer/customer.reselect";
import { selectUserAddresses } from "../../redux/user/user.reselect";

const OrderCard = ({ order, index, customerInfo, userAddresses }) => {
  return (
    <div className="bg-white card mb-4 order-list shadow-sm">
      <div className="gold-members p-4">
        <Media>
          <Image className="mr-4" src="/img/3.jpg" alt="image" />
          <Media.Body>
            {order.send_date !== "" ? (
              <span className="float-right text-info">
                <Translate>Delivered on</Translate> {order.send_date}
                <Icofont icon="check-circled" className="text-success ml-1" />
              </span>
            ) : (
              ""
            )}
            <h6 className="mb-2">{`ORDER #${order.order_number}`}</h6>
            <p className="text-gray mb-1">
              <Icofont icon="location-arrow" />
              {AddressHelper.GetAddress(userAddresses, order.address_id)}
            </p>
            <p className="text-gray mb-3">
              <Icofont icon="list" /> <Translate>ORDER#</Translate>
              {order.order_number}
              <Icofont icon="clock-time" className="ml-2" /> {order.order_date}
            </p>
            {/* <p className="text-dark">ORDER PRODUCTS</p> */}
            <hr />
            <div className="float-right">
              {/* <Link className="btn btn-sm btn-outline-primary mr-1" to="#">
              <Icofont icon="headphone-alt" /> HELP
            </Link> */}
              <OrderDetailButton order={order} />
            </div>
            <p className="mb-0 text-black text-primary pt-2">
              <span className="text-black font-weight-bold">
                {" "}
                <Translate>Total Bill</Translate>:
              </span>{" "}
              {order.total_price}{" "}
              {customerInfo !== null ? customerInfo.currency_unit : "₺"}
            </p>
          </Media.Body>
        </Media>
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  customerInfo: selectCustomerInfo,
  userAddresses: selectUserAddresses,
});
export default connect(mapStateToProps)(OrderCard);
