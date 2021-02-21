import { Image, Media } from "react-bootstrap";

import React from "react";
import { TranslatePlaceholder } from "../../utilities/translator-placeholder";

const OrderDetailModalBody = ({ orderDetail, product, currency_unit }) => {
  return (
    <div
      className={"p-3 border-bottom gold-members"}
      // key={orderDetail.frm_order_detail_id}
    >
      <Media>
        <Image
          className={"mr-3 rounded-pill "}
          src={`http://206.189.55.20:8080/preview/276ce05d-837b-4aa1-8f6f-ff02597a0e01/sf/x_file?_fai=${product.photo}`}
          alt={product.name}
          width="50"
          height="50"
        />
        <Media.Body>
          <h6 className="mb-1">{product.name}</h6>
          <p className="text-gray mb-0">
            {orderDetail.price + " " + currency_unit}
          </p>
          <br />
          <p className="mb-0">
            {orderDetail.options !== "" &&
              TranslatePlaceholder("Choosed :") + "" + orderDetail.options}
          </p>
          <p className="mb-0">
            {orderDetail.material_add !== "" &&
              TranslatePlaceholder("Added :") + orderDetail.material_add}
          </p>
          <p className="mb-0">
            {orderDetail.material_removed !== "" &&
              TranslatePlaceholder("Removed :") + orderDetail.material_removed}
          </p>
          {/* <p className="text-gray mb-0">{orderDetail.options}</p>
        <p className="text-gray mb-0">{orderDetail.material_add}</p>
        <p className="text-gray mb-0">{orderDetail.material_removed}</p> */}
        </Media.Body>
      </Media>
    </div>
  );
};
export default OrderDetailModalBody;
