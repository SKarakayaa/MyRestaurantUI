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
    } = this.props;
    return (
      !areProductMaterialsFetching && (
        <>
          <div className="p-4 bg-white shadow-sm">
            <Row>
              <Col md={12}>
                <h4 className="font-weight-bold mt-0 mb-3">
                  <Translate>Favourites</Translate>
                </h4>
              </Col>
              {favoriteProducts &&
                favoriteProducts.map((favoriteProduct) => {
                  let product = products.find(
                    (product) =>
                      product.frm_product_id === favoriteProduct.product_id
                  );
                  return (
                    <Col
                      md={4}
                      sm={6}
                      className="mb-4 pb-2"
                      key={favoriteProduct.frm_user_product_favorites_id}
                    >
                      <ProductCardItem
                        product={product}
                        currencyUnit={customerInfo.currency_unit}
                        isFavorite={true}
                      />
                    </Col>
                  );
                })}
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
