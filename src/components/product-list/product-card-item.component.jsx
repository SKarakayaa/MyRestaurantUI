import { Badge, Button, Image } from "react-bootstrap";

import Icofont from "react-icofont";
import { Link } from "react-router-dom";
import React from "react";

const ProductCardItem = ({ product, currencyUnit, isFavorite }) => (
  <div className="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
    <div className="list-card-image">
      <div
        className={
          isFavorite
            ? "favourite-heart position-absolute text-danger"
            : "favourite-heart position-absolute text-secondary"
        }
      >
        <Link to="#">
          <Icofont icon="heart" />
        </Link>
      </div>
      <Link to="#">
        <Image
          className="img-fluid item-img"
          alt="image"
          src={`http://206.189.55.20:8080/preview/276ce05d-837b-4aa1-8f6f-ff02597a0e01/sf/x_file?_fai=${product.photo}`}
        />
      </Link>
    </div>
    <div className="p-3 position-relative">
      <div className="list-card-body">
        <h6 className="mb-1">
          <Link to="#" className="text-black">
            {product.name}
          </Link>
        </h6>
        <p className="text-gray mb-3">{product.description}</p>
        <p className="text-gray time mb-0">
          <Link to="#" className="btn btn-link btn-sm pl-0 text-black pr-0">
            {product.price} {currencyUnit}
          </Link>
          {product.is_new ? (
            <Badge variant="success" className="ml-1">
              NEW
            </Badge>
          ) : (
            ""
          )}
          <span className="float-right">
            <Button variant="outline-secondary" size="sm">
              ADD
            </Button>
          </span>
        </p>
      </div>
    </div>
  </div>
);

export default ProductCardItem;
