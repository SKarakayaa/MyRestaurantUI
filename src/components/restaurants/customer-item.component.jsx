import { Col, Image } from "react-bootstrap";

import Icofont from "react-icofont";
import { Link } from "react-router-dom";
import React from "react";

const CustomerItem = ({ customer }) => (
  <Col md={4} sm={6} className="mb-4 pb-2">
    <div className="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
      <div className="list-card-image">
        <Link to={`detail/${customer.frm_customer_id}`}>
          <Image
            src="img/list/1.png"
            className="img-fluid item-img"
            alt="customer"
          />
        </Link>
      </div>
      <div className="p-3 position-relative">
        <div className="list-card-body">
          <h6 className="mb-1">
            <Link
              to={`detail/${customer.frm_customer_id}`}
              className="text-black"
            >
              {customer.name}
            </Link>
          </h6>
          {customer.cuisines && (
            <p className="text-gray mb-3">{customer.cuisines}</p>
          )}
          {customer.order_time && (
            <p className="text-gray mb-3 time">
              <span className="bg-light text-dark rounded-sm pl-2 pb-1 pt-1 pr-2">
                <Icofont icon="wall-clock" /> {customer.order_time}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  </Col>
);
export default CustomerItem;
