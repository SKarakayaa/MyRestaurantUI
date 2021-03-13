import { Col, Row } from "react-bootstrap";
import {
  selectAreFetchingFavorites,
  selectFavoriteProducts,
} from "../../redux/user/user.reselect";
import {
  selectAreFetchingProductMaterials,
  selectProducts,
} from "../../redux/product/product.reselect";
import {
  selectCustomerId,
  selectCustomerInfo,
} from "../../redux/customer/customer.reselect";

import AuthHelper from "../../helpers/authHelper";
import ProductCardItem from "../../components/product-list/product-card-item.component";
import React from "react";
import { Redirect } from "react-router-dom";
import Translate from "../../utilities/translator";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchFavoriteProductsStartAsync } from "../../redux/user/user.actions";
import { fetchProductMaterialStartAsync } from "../../redux/product/product.actions";

class Favorites extends React.Component {
  componentDidMount() {
    const {
      loadFavoriteProducts,
      loadProductMaterials,
      customerId,
    } = this.props;
    const userid = AuthHelper.GetCurrentUser().userId;
    loadFavoriteProducts(userid, customerId);
    loadProductMaterials(customerId);
  }
  render() {
    const {
      favoriteProducts,
      products,
      customerInfo,
      areProductMaterialsFetching,
      customerId,
    } = this.props;
    return customerId === null ? (
      <Redirect to="/" />
    ) : (
      !areProductMaterialsFetching && (
        <>
          <div className="p-4 bg-white shadow-sm">
            <Row>
              <Col md={12}>
                <h4 className="font-weight-bold mt-0 mb-3">
                  <Translate>Favourites</Translate>
                </h4>
              </Col>
              {favoriteProducts && favoriteProducts.length > 0 ? (
                favoriteProducts.map((favoriteProduct) => {
                  let product = products.find(
                    (product) =>
                      product.frm_product_id === favoriteProduct.product_id
                  );
                  return (
                    product !== undefined && (
                      <ProductCardItem
                        key={favoriteProduct.frm_user_product_favorites_id}
                        product={product}
                        currencyUnit={customerInfo.currency_unit}
                      />
                    )
                  );
                })
              ) : (
                <h2 className="text-center">
                  Bu restoranda favori ürününüz bulunmamakta
                </h2>
              )}
            </Row>
          </div>
        </>
      )
    );
  }
}
const mapStateToProps = createStructuredSelector({
  areFavoritesFetching: selectAreFetchingFavorites,
  favoriteProducts: selectFavoriteProducts,
  products: selectProducts,
  customerInfo: selectCustomerInfo,
  areProductMaterialsFetching: selectAreFetchingProductMaterials,
  customerId: selectCustomerId,
});
const mapDispatchToProps = (dispatch) => ({
  loadFavoriteProducts: (userid, customerid) =>
    dispatch(fetchFavoriteProductsStartAsync(userid, customerid)),
  loadProductMaterials: (customerid) =>
    dispatch(fetchProductMaterialStartAsync(customerid)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
