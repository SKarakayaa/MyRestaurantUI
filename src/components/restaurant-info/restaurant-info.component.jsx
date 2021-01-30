import {
  selectCustomerId,
  selectCustomerMoreInfo,
  selectCustomerMoreInfoIsFetching,
} from "../../redux/customer/customer.reselect";

import CustomerInfo from "./customer-info.component";
import CustomerMoreInfo from "./customer-more-info.component";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchCustomerMoreInfoStartAsync } from "../../redux/customer/customer.actions";

class RestaurantInfo extends React.Component {
  componentDidMount() {
    const { loadCustomerMoreInfo, customerId } = this.props;
    loadCustomerMoreInfo(customerId);
  }
  render() {
    const { isFethingCustomerMoreInfo, customerMoreInfo } = this.props;
    return (
      <div id="restaurant-info" className="bg-white rounded shadow-sm p-4 mb-4">
        <CustomerInfo />
        <hr className="clearfix" />
        <hr className="clearfix" />
        {!isFethingCustomerMoreInfo && (
          <CustomerMoreInfo customerMoreInfo={customerMoreInfo} />
        )}
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  isFethingCustomerMoreInfo: selectCustomerMoreInfoIsFetching,
  customerMoreInfo: selectCustomerMoreInfo,
  customerId: selectCustomerId,
});
const mapDispatchToProps = (dispatch) => ({
  loadCustomerMoreInfo: (customerid) =>
    dispatch(fetchCustomerMoreInfoStartAsync(customerid)),
});
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantInfo);
