import React from "react";
import { Row, Col, Button, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import CardItem from "../common/CardItem";
import * as productActions from "../../redux/actions/productActions";
import * as userActions from "../../redux/actions/userActions";
import { bindActionCreators } from "redux";
import IsLogin from "../Helper";
import history from "../history";

class Favourites extends React.Component {
  componentDidMount() {
    if (this.props.products.length === 0) {
      this.props.actions.loadProducts(1);
    }
    if (this.props.categories.length === 0) {
      this.props.actions.laodCategories(1);
    }
    if (IsLogin() && this.props.favoriteProducts.length === 0) {
      this.props.actions.loadFavoriteProducts(1);
    }
  }
  GetProduct = (productid) => {
    let product = this.props.products.find(
      (x) => x.frm_product_id === productid
    );
    return product;
  };
  GetCategoryName = (categoryid) => {
    let categoryName = this.props.categories.find(
      (x) => x.frm_product_categories_id === categoryid
    ).name;
    return categoryName;
  };
  render() {
    if (!IsLogin()) {
      history.push("/login");
    }
    const { favoriteProducts } = this.props;
    return IsLogin() ? (
      <>
        <div className="p-4 bg-white shadow-sm">
          <Row>
            <Col md={12}>
              <h4 className="font-weight-bold mt-0 mb-3">Favourites</h4>
            </Col>
            {favoriteProducts &&
              favoriteProducts.map((favoriteProduct) => {
                let product = this.GetProduct(favoriteProduct.product_id);
                return product !== undefined ? (
                  <Col
                    md={4}
                    sm={6}
                    className="mb-4 pb-2"
                    key={favoriteProduct.frm_user_product_favorites_id}
                  >
                    <CardItem
                      title={product.name}
                      subTitle={this.GetCategoryName(
                        product.product_category_id
                      )}
                      imageAlt="Product"
                      image="img/list/1.png"
                      imageClass="img-fluid item-img"
                      linkUrl="detail"
                      offerText="65% off Coupon OSAHAN50"
                      offerColor="danger"
                      time={product.prepation_time}
                      price={"£ " + product.price}
                      showPromoted={false}
                      promotedVariant="dark"
                      favIcoIconColor="text-danger"
                      rating="3.1 (300+)"
                    />
                  </Col>
                ) : (
                  ""
                );
              })}

            <Col md={12} className="text-center load-more">
              <Button variant="primary" type="button" disabled="">
                <Spinner animation="grow" size="sm" className="mr-1" />
                Loading...
              </Button>
            </Col>
          </Row>
        </div>
      </>
    ) : (
      ""
    );
  }
}
function mapStateToProps(state) {
  return {
    products: state.productReducer,
    favoriteProducts: state.favoriteProductReducer,
    categories: state.categoryReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadProducts: bindActionCreators(
        productActions.loadProductsRequest,
        dispatch
      ),
      loadFavoriteProducts: bindActionCreators(
        userActions.loadFavoritesRequest,
        dispatch
      ),
      laodCategories: bindActionCreators(
        productActions.loadCategoriesRequest,
        dispatch
      ),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
