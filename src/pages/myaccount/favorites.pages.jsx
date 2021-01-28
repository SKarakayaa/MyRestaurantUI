import { Col, Row } from "react-bootstrap";
import {
  selectAreFetchingFavorites,
  selectFavoriteProducts,
} from "../../redux/user/user.reselect";
import {
  selectAreFetchingProductMaterials,
  selectProducts,
} from "../../redux/product/product.reselect";

import AuthHelper from "../../helpers/authHelper";
import { CurrentCustomerId } from "../../componentsold/Helper";
import ProductCardItem from "../../components/product-list/product-card-item.component";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchFavoriteProductsStartAsync } from "../../redux/user/user.actions";
import { fetchProductMaterialStartAsync } from "../../redux/product/product.actions";
import { selectCustomerInfo } from "../../redux/customer/customer.reselect";

class Favorites extends React.Component {
  componentDidMount() {
    const { loadFavoriteProducts, loadProductMaterials } = this.props;
    const userid = AuthHelper.GetCurrentUser().userId;
    loadFavoriteProducts(userid, CurrentCustomerId());
    loadProductMaterials(CurrentCustomerId());
  }
  render() {
    const {
      favoriteProducts,
      products,
      customerInfo,
      areProductMaterialsFetching,
    } = this.props;
    console.log("favorites :", favoriteProducts);
    return (
      !areProductMaterialsFetching && (
        <>
          <div className="p-4 bg-white shadow-sm">
            <Row>
              <Col md={12}>
                <h4 className="font-weight-bold mt-0 mb-3">Favourites</h4>
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
});
const mapDispatchToProps = (dispatch) => ({
  loadFavoriteProducts: (userid, customerid) =>
    dispatch(fetchFavoriteProductsStartAsync(userid, customerid)),
  loadProductMaterials: (customerid) =>
    dispatch(fetchProductMaterialStartAsync(customerid)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);