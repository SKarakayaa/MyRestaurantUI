import { Image, Media } from "react-bootstrap";

import AddToCartButton from "../buttons/add-to-cart-button.component";
import React from "react";

const ProductLineItem = ({ product, currencyUnit }) => (
  <div className="p-3 border-bottom gold-members">
    <span className="float-right">
      <AddToCartButton variant="outline-secondary" product={product} />
      {/* <Button variant="outline-secondary" size="sm">
        ADD
      </Button> */}
    </span>
    <Media>
      <Image
        className="mr-3 rounded-pill"
        width="50"
        height="50"
        src={`http://206.189.55.20:8080/preview/276ce05d-837b-4aa1-8f6f-ff02597a0e01/sf/x_file?_fai=${product.photo}`}
      />
      <Media.Body>
        <h6 className="mb-1">{product.name}</h6>
        <p className="text-gray mb-0">
          {product.price} {currencyUnit}
        </p>
      </Media.Body>
    </Media>
  </div>
);
export default ProductLineItem;
