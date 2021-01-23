import {
  selectIsFetchingUserOrderHistory,
  selectUserOrderHistory,
} from "../../redux/order/order.reselect";

import AuthHelper from "../../helpers/authHelper";
import { CurrentCustomerId } from "../../componentsold/Helper";
import OrderCard from "../../components/myaccount/order-card.component";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchUserOrderHistoryStartAsync } from "../../redux/order/order.actions";

class Orders extends React.Component {
  componentDidMount() {
    const { loadOrderHistory } = this.props;
    const userid = AuthHelper.GetCurrentUser().userId;
    loadOrderHistory(CurrentCustomerId(), userid);
  }

  render() {
    const { orderHistory } = this.props;
    console.log("order history :", orderHistory);
    return (
      <>
        <div className="p-4 bg-white shadow-sm">
          <h4 className="font-weight-bold mt-0 mb-4">Past Orders</h4>
          {orderHistory &&
            orderHistory.map((order, index) => (
              <OrderCard order={order} index={index} key={index} />
            ))}
        </div>
      </>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  orderHistoryIsFetching: selectIsFetchingUserOrderHistory,
  orderHistory: selectUserOrderHistory,
});
const mapDispatchToProps = (dispatch) => ({
  loadOrderHistory: (customerid, userid) =>
    dispatch(fetchUserOrderHistoryStartAsync(customerid, userid)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
