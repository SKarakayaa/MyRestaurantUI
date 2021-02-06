import { Badge, Image } from "react-bootstrap";

import AddToCartButton from "../buttons/add-to-cart-button.component";
import Icofont from "react-icofont";
import { Link } from "react-router-dom";
import React from "react";
import Translate from "../../utilities/translator";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { favoriteAsync } from "../../redux/user/user.actions";
import { selectCustomerId } from "../../redux/customer/customer.reselect";

const ProductCardItem = ({
  product,
  currencyUnit,
  favoriteInformation,
  favorite,
  customerId,
}) => (
  <div className="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
    <div className="list-card-image">
      <div
        className={
          favoriteInformation.isFavorite
            ? "favourite-heart position-absolute text-danger"
            : "favourite-heart position-absolute text-secondary"
        }
      >
        <Link
          to="#"
          onClick={() =>
            favorite(
              product,
              customerId,
              favoriteInformation.isFavorite,
              favoriteInformation.favoriteId
            )
          }
        >
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
              <Translate>NEW</Translate>
            </Badge>
          ) : (
            ""
          )}
          <span className="float-right">
            <AddToCartButton variant="outline-secondary" product={product} />
          </span>
        </p>
      </div>
    </div>
  </div>
);
const mapStateToProps = createStructuredSelector({
  customerId: selectCustomerId,
});
const mapDispatchToProps = (dispatch) => ({
  favorite: (product, customerid, isFavorite, favoriteid) =>
    dispatch(favoriteAsync(product, customerid, isFavorite, favoriteid)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductCardItem);
