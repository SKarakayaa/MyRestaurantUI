import {
  selectCustomerId,
  selectCustomerInfo,
  selectCustomerInfoIsFetching,
  selectErrorMessage,
  selectIsMainSite,
} from "../redux/customer/customer.reselect";

import FailOrder from "../components/thanks/fail-order.component";
import { Fragment } from "react";
import Loading from "../components/common/loading.component";
import React from "react";
import Slider from "../components/common/slider.component";
import TabPane from "../components/tab-pane/tab-pane.component";
import { changeCustomerIdAsync } from "../redux/customer/customer.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchCustomerInfoStartAsync } from "../redux/customer/customer.actions";

class Detail extends React.Component {
  componentDidMount() {
    const {
      fetchCustomerInfoStartAsync,
      customerId,
      isMainSite,
      changeCustomerId,
      match,
    } = this.props;
    if (isMainSite) {
      changeCustomerId(parseInt(match.params.id));
      fetchCustomerInfoStartAsync(parseInt(match.params.id));
    } else {
      fetchCustomerInfoStartAsync(customerId);
    }
  }
  render() {
    const { isCustomerInfoFetching, errorMessage, customerInfo } = this.props;
    console.log("errorMessage", errorMessage);
    return isCustomerInfoFetching ? (
      <Loading />
    ) : customerInfo !== null ? (
      <Fragment>
        <Slider />
        <TabPane />
      </Fragment>
    ) : (
      <FailOrder errorHeader="404" orderErrorMessage={errorMessage} />
    );
  }
}
const mapStateToProps = createStructuredSelector({
  isCustomerInfoFetching: selectCustomerInfoIsFetching,
  customerInfo: selectCustomerInfo,
  customerId: selectCustomerId,
  isMainSite: selectIsMainSite,
  errorMessage: selectErrorMessage,
});
const mapDispatchToProps = (dispatch) => ({
  fetchCustomerInfoStartAsync: (customerid) =>
    dispatch(fetchCustomerInfoStartAsync(customerid)),
  changeCustomerId: (customerid) => dispatch(changeCustomerIdAsync(customerid)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
