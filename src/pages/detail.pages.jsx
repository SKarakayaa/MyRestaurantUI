import {
  selectCustomerId,
  selectCustomerInfo,
  selectCustomerInfoIsFetching,
  selectIsMainSite,
} from "../redux/customer/customer.reselect";

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
    const { isCustomerInfoFetching } = this.props;
    return isCustomerInfoFetching ? (
      <Loading />
    ) : (
      <Fragment>
        <Slider />
        <TabPane />
      </Fragment>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  isCustomerInfoFetching: selectCustomerInfoIsFetching,
  customerInfo: selectCustomerInfo,
  customerId: selectCustomerId,
  isMainSite: selectIsMainSite,
});
const mapDispatchToProps = (dispatch) => ({
  fetchCustomerInfoStartAsync: (customerid) =>
    dispatch(fetchCustomerInfoStartAsync(customerid)),
  changeCustomerId: (customerid) => dispatch(changeCustomerIdAsync(customerid)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
