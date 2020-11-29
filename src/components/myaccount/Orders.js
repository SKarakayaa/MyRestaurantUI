import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OrderCard from "../common/OrderCard";
import * as orderActions from "../../redux/actions/orderActions";
import * as addressActions from "../../redux/actions/addressActions";
import IsLogin from "../Helper";
import history from "../history";
import moment from 'moment'
class Orders extends React.Component {
  componentDidMount() {
    this.props.actions.loadOrders(1);
    if (this.props.addresses.length === 0) {
      this.props.actions.loadAddress(1);
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
    const { orders } = this.props;
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
                orderDate={moment(order.order_date).format("dddd, MMMM Do YYYY")}
                deliveredDate={moment(order.send_date).format("dddd, MMMM Do YYYY")}
                orderTitle={"ORDER #" + (parseInt(index) + 1)}
                address={this.GetAddress(order.address_id)}
                orderProducts="Veg Masala Roll x 1, Veg Burger x 1, Veg Penne Pasta in Red Sauce x 1"
                orderTotal={"£ " + order.total_price}
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
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
