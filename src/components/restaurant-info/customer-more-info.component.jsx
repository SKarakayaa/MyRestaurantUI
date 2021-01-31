import Icofont from "react-icofont";
import { Link } from "react-router-dom";
import React from "react";
import Translate from "../../utilities/translator";

const CustomerMoreInfo = ({ customerMoreInfo }) => (
  <>
    <h5 className="mt-4 mb-4">
      <Translate >More Info</Translate>
    </h5>
    {/* <p className="mb-3">
      Dal Makhani, Panneer Butter Masala, Kadhai Paneer, Raita, Veg Thali,
      Laccha Paratha, Butter Naan
    </p> */}
    <div className="border-btn-main mb-4">
      {customerMoreInfo.map((info) => (
        <Link
          className="border-btn text-success mr-2"
          to="#"
          key={info.frm_customer_more_info_id}
        >
          <Icofont icon="check-circled" /> {info.name}
        </Link>
      ))}
    </div>
  </>
);
export default CustomerMoreInfo;
