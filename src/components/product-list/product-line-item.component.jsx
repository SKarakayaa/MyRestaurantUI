import { Image, Media } from "react-bootstrap";
import {
  selectAreFetchingFavorites,
  selectFavoriteProducts,
} from "../../redux/user/user.reselect";

import AddToCartButton from "../buttons/add-to-cart-button.component";
import FavoriteProductHelper from "../../helpers/favoriteProductHelper";
import Icofont from "react-icofont";
import { Link } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { favoriteAsync } from "../../redux/user/user.actions";
import { selectCustomerId } from "../../redux/customer/customer.reselect";

const ProductLineItem = ({
  product,
  currencyUnit,
  favorites,
  areFetchingFavorites,
  customerid,
  favorite,
}) => {
  let favoriteProduct =
    !areFetchingFavorites &&
    FavoriteProductHelper.GetFavoriteInformation(
      favorites,
      product.frm_product_id
    );
  return (
    <div className="p-3 border-bottom gold-members">
      <span className="float-right">
        <div className="btn-toolbar">
          <Link
            to="#"
            onClick={() =>
              favorite(
                product,
                customerid,
                favoriteProduct.isFavorite,
                favoriteProduct.favoriteId
              )
            }
          >
            <Icofont
              icon="heart icofont-3x"
              style={{
                color: favoriteProduct.isFavorite ? "red" : "white",
                textShadow: "-1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000",
              }}
            />
          </Link>
          &emsp;
          <AddToCartButton variant="outline-secondary" product={product} />
        </div>
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
};
const mapStateToProps = createStructuredSelector({
  favorites: selectFavoriteProducts,
  areFetchingFavorites: selectAreFetchingFavorites,
  customerid: selectCustomerId,
});
const mapDispatchToProps = (dispatch) => ({
  favorite: (product, customerid, isFavorite, favoriteid) =>
    dispatch(favoriteAsync(product, customerid, isFavorite, favoriteid)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductLineItem);
