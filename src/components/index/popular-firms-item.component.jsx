import { Badge, Image } from "react-bootstrap";

import Icofont from "react-icofont";
import { Link } from "react-router-dom";
import React from "react";

const PopularFirmsItem = ({ customer }) => (
  <div className="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
    <div className="list-card-image">
      <div className={`favourite-heart position-absolute text-danger`}>
        <Icofont icon="heart" />
      </div>
      <div className="member-plan position-absolute">
        <Badge variant="success">Popular</Badge>
      </div>
      <Link to={`detail/${customer.frm_customer_id}`}>
        <Image
          src={`http://206.189.55.20:8080/preview/276ce05d-837b-4aa1-8f6f-ff02597a0e01/sf/x_file?_fai=${customer.logo_path}`}
          className="img-fluid item-img"
          style={{ width: "264px", height: "166px" }}
          alt="popular-customer"
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
        <p className="text-gray mb-3" style={{ height: "30px" }}>
          {customer.meta_data}
        </p>

        <p className="text-gray mb-3 time">
          {customer.order_time !== "" && (
            <span className="bg-light text-dark rounded-sm pl-2 pb-1 pt-1 pr-2">
              <Icofont icon="wall-clock" /> {customer.order_time}
            </span>
          )}
          {customer.phone_number !== "" && (
            <span className="float-right text-black-50">
              {" "}
              <Icofont icon="phone" /> {customer.phone_number}
            </span>
          )}
        </p>
      </div>
      <div className="list-card-badge">
        <Badge
          variant={customer.customer_status === "1" ? "success" : "danger"}
        >
          {customer.customer_status_qw_}
        </Badge>{" "}
        <small>
          {customer.customer_status === "1"
            ? "Firm is open and not busy"
            : "Firms is busy now, your order may late!"}
        </small>
      </div>
    </div>
  </div>
);
export default PopularFirmsItem;
