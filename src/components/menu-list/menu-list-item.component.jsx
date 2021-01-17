import AddToCartButton from "../buttons/add-to-cart-button.component";
import { Fragment } from "react";
import { Image } from "react-bootstrap";
import React from "react";

const MenuListItem = ({ menu, currencyUnit }) => (
  <Fragment>
    <div className="position-relative mall-category-item">
      <AddToCartButton
        className="btn btn-primary btn-sm position-absolute"
        product={menu}
      />
      <Image
        src={`http://206.189.55.20:8080/preview/276ce05d-837b-4aa1-8f6f-ff02597a0e01/sf/x_file?_fai=${menu.photo}`}
        className="img-fluid"
        fluid
        alt="carousel"
      />
      <h6>{menu.name}</h6>
      {
        <small>
          {menu.price} {currencyUnit}
        </small>
      }
    </div>
  </Fragment>
);
export default MenuListItem;
