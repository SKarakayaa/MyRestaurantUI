import React, { Component } from "react";

import { Badge } from "react-bootstrap";
import Icofont from "react-icofont";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class RestaurantInfo extends Component {
  render() {
    const { customerInfo, customerMoreInfo } = this.props;
    return (
      <div id="restaurant-info" className="bg-white rounded shadow-sm p-4 mb-4">
        <div className="address-map float-right ml-5">
          <div className="mapouter">
            <div className="gmap_canvas">
              <iframe
                title="addressMap"
                width="300"
                height="170"
                id="gmap_canvas"
                src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=9&ie=UTF8&iwloc=&output=embed"
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
          <br /> Near Model Town, Ludhiana, PUNJAB
        </p>
        <p className="mb-2 text-black">
          <Icofont icon="phone-circle text-primary mr-2" />{" "}
          {customerInfo.phone_number}
        </p>
        <p className="mb-2 text-black">
          <Icofont icon="email text-primary mr-2" /> {customerInfo.username}
        </p>
        <p className="mb-2 text-black">
          <Icofont icon="clock-time text-primary mr-2" /> Today{" "}
          {customerInfo.order_time} - {customerInfo.work_time}
          <Badge variant="success" className="ml-1">
            {" "}
            OPEN NOW{" "}
          </Badge>
        </p>
        <hr className="clearfix" />
        <hr className="clearfix" />
        <h5 className="mt-4 mb-4">More Info</h5>
        <p className="mb-3">
          Dal Makhani, Panneer Butter Masala, Kadhai Paneer, Raita, Veg Thali,
          Laccha Paratha, Butter Naan
        </p>
        <div className="border-btn-main mb-4">
          {customerMoreInfo.map((customerMoreInfo) => (
            <Link
              className="border-btn text-success mr-2"
              to="#"
              key={customerMoreInfo.frm_customer_more_info_id}
            >
              <Icofont icon="check-circled" /> {customerMoreInfo.name}
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    customerInfo: state.customerInfoReducer,
    customerMoreInfo: state.customerMoreInfoReducer,
  };
}
export default connect(mapStateToProps)(RestaurantInfo);
