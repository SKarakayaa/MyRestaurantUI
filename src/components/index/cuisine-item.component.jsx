import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";

const CuisineItem = ({ title, photo }) => (
  <div className="item">
    <div className="osahan-category-item" style={{ height: `106px` }}>
      <Link to="#">
        <Image
          src={`http://206.189.55.20:8080/preview/276ce05d-837b-4aa1-8f6f-ff02597a0e01/sf/x_file?_fai=${photo}`}
          className="img-fluid"
          alt="cuisine"
        />
        {title ? <h6>{title}</h6> : ""}
      </Link>
    </div>
  </div>
);
export default CuisineItem;
