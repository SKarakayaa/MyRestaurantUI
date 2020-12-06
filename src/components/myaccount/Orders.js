import * as addressActions from "../../redux/actions/addressActions";
import * as customerActions from "../../redux/actions/customerActions";
import * as orderActions from "../../redux/actions/orderActions";

import IsLogin, { CurrentCustomerId } from "../Helper";

import OrderCard from "../common/OrderCard";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import history from "../history";
import moment from "moment";

class Orders extends React.Component {
  componentDidMount() {
    this.props.actions.loadOrders(CurrentCustomerId());
    if (this.props.addresses.length === 0) {
      this.props.actions.loadAddress(CurrentCustomerId());
    }
    if (this.props.customerInfo.length === undefined) {
      this.props.actions.loadCustomerInfo(CurrentCustomerId());
    }
  }
  GetAddress = (addressid) => {
    let { addresses } = this.props;
    if (addresses.length !== 0) {
      var address = addresses.find((x) => x.frm_user_adress_id === addressid);
      if (address !== undefined) {
        return (
          address.delivery_area +
          "-" +
          address.delivery_instructions +
          "-" +
          address.location
        );
      } else {
        return "";
      }
    } else {
      return "";
    }
  };
  render() {
    if (!IsLogin()) {
      history.push("/login");
    }
    const { orders, customerInfo } = this.props;
    return IsLogin() ? (
      <>
        <div className="p-4 bg-white shadow-sm">
          <h4 className="font-weight-bold mt-0 mb-4">Past Orders</h4>
          {orders &&
            orders.map((order, index) => (
              <OrderCard
                image="/img/3.jpg"
                imageAlt=""
                orderNumber={order.order_number}
                orderDate={moment(order.order_date).format(
                  "dddd, MMMM Do YYYY"
                )}
                deliveredDate={moment(order.send_date).format(
                  "dddd, MMMM Do YYYY"
                )}
                orderTitle={"ORDER #" + (parseInt(index) + 1)}
                address={this.GetAddress(order.address_id)}
                orderProducts="Veg Masala Roll x 1, Veg Burger x 1, Veg Penne Pasta in Red Sauce x 1"
                orderTotal={
                  order.total_price + " " + customerInfo.currency_unit
                }
                orderId={order.frm_orders_id}
                key={order.frm_orders_id}
                helpLink="#"
                detailLink="/detail"
              />
            ))}
        </div>
      </>
    ) : (
      ""
    );
  }
}
function mapStateToProps(state) {
  return {
    orders: state.createOrderReducer,
    addresses: state.addressReducer,
    customerInfo: state.customerInfoReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadOrders: bindActionCreators(orderActions.loadOrdersRequest, dispatch),
      loadAddress: bindActionCreators(
        addressActions.loadAddressesRequest,
        dispatch
      ),
      loadCustomerInfo: bindActionCreators(
        customerActions.loadCustomerInfoRequest,
        dispatch
      ),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
