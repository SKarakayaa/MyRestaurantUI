import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";

const SpecialFirmsItem = ({ customer }) => (
  <div className="products-box">
    <Link to={`detail/${customer.frm_customer_id}`}>
      <Image
        src={`http://206.189.55.20:8080/preview/276ce05d-837b-4aa1-8f6f-ff02597a0e01/sf/x_file?_fai=${customer.logo_path}`}
        className="img-fluid rounded"
        alt="special-firm"
      />
    </Link>
  </div>
);
export default SpecialFirmsItem;
