import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";

const CuisineItem = ({ title }) => (
  <div className="item">
    <div className="osahan-category-item" style={{height:`106px`}}>
      <Link to="#">
        <Image
          src="img/list/1.png"
          className="img-fluid"
          alt="cuisine"
        /> 
        {title ? <h6>{title}</h6> : ""}
      </Link>
    </div>
  </div>
);
export default CuisineItem;
