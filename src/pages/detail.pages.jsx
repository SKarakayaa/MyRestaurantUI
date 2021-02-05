import {
  selectCustomerInfo,
  selectCustomerInfoIsFetching,
} from "../redux/customer/customer.reselect";

import { Fragment } from "react";
import Loading from "../components/common/loading.component";
import React from "react";
import Slider from "../components/common/slider.component";
import TabPane from "../components/tab-pane/tab-pane.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

const Detail = ({ isCustomerInfoFetching }) =>
  isCustomerInfoFetching ? (
    <Loading />
  ) : (
    <Fragment>
      <Slider />
      <TabPane />
    </Fragment>
  );

const mapStateToProps = createStructuredSelector({
  isCustomerInfoFetching: selectCustomerInfoIsFetching,
  customerInfo: selectCustomerInfo,
});

export default connect(mapStateToProps)(Detail);
