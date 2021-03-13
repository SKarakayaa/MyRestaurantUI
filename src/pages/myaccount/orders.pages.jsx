import {
  selectIsFetchingUserOrderHistory,
  selectUserOrderHistory,
} from "../../redux/order/order.reselect";

import AuthHelper from "../../helpers/authHelper";
import OrderCard from "../../components/myaccount/order-card.component";
import React from "react";
import Translate from "../../utilities/translator";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchUserOrderHistoryStartAsync } from "../../redux/order/order.actions";
import { selectCustomerId } from "../../redux/customer/customer.reselect";

class Orders extends React.Component {
  componentDidMount() {
    const { loadOrderHistory, customerId } = this.props;
    const userid = AuthHelper.GetCurrentUser().userId;
    loadOrderHistory(customerId, userid);
  }

  render() {
    const { orderHistory } = this.props;
    console.log("order history ", orderHistory);
    return (
      <>
        <div className="p-4 bg-white shadow-sm">
          <h4 className="font-weight-bold mt-0 mb-4">
            <Translate>Past Orders</Translate>
          </h4>
          {orderHistory && orderHistory.length > 0 ? (
            orderHistory.map((order, index) => (
              <OrderCard order={order} index={index} key={index} />
            ))
          ) : (
            <h2 className="text-center">Bu restorandan siparişiniz bulunmamakta</h2>
          )}
        </div>
      </>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  orderHistoryIsFetching: selectIsFetchingUserOrderHistory,
  orderHistory: selectUserOrderHistory,
  customerId: selectCustomerId,
});
const mapDispatchToProps = (dispatch) => ({
  loadOrderHistory: (customerid, userid) =>
    dispatch(fetchUserOrderHistoryStartAsync(customerid, userid)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
