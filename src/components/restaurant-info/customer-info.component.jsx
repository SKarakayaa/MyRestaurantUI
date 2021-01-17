import { Badge } from "react-bootstrap";
import { Fragment } from "react";
import Icofont from "react-icofont";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCustomerInfo } from "../../redux/customer/customer.reselect";

const CustomerInfo = ({ customerInfo }) => (
  <Fragment>
    <div className="address-map float-right ml-5">
      <div className="mapouter">
        <div className="gmap_canvas">
          <iframe
            title="addressMap"
            width="300"
            height="170"
            id="gmap_canvas"
            src={`https://maps.google.com/maps?q=${customerInfo.customer_other_address}&t=&z=9&ie=UTF8&iwloc=&output=embed`}
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
          ></iframe>
        </div>
      </div>
    </div>
    <h5 className="mb-4">Restaurant Info</h5>
    <p className="mb-3">
      {customerInfo.customer_location}
      <br />
      {customerInfo.customer_other_address}
    </p>
    <p className="mb-2 text-black">
      <Icofont icon="phone-circle text-primary mr-2" />{" "}
      {customerInfo.phone_number}
    </p>
    <p className="mb-2 text-black">
      <Icofont icon="email text-primary mr-2" /> {customerInfo.email}
    </p>
    <p className="mb-2 text-black">
      <Icofont icon="clock-time text-primary mr-2" /> Today{" "}
      {customerInfo.work_time_start} - {customerInfo.work_time_end}
      <Badge variant="success" className="ml-1">
        {" "}
        OPEN NOW{" "}
      </Badge>
    </p>
  </Fragment>
);
const mapStateToProps = createStructuredSelector({
  customerInfo: selectCustomerInfo,
});
export default connect(mapStateToProps)(CustomerInfo);
