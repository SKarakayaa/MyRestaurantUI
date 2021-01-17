import * as productActions from "../../redux/actions/productActions";

import { Col, Row } from "react-bootstrap";
import React, { Component } from "react";

// import BestSeller from "./BestSeller";
import { CurrentCustomerId } from "../Helper";
import ProductCard from "../tabs/OrderOnline/ProductCard";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Kios extends Component {
  componentDidMount() {
    const { actions, categories, products } = this.props;
    if (categories.length === 0) {
      actions.loadCategories(CurrentCustomerId());
    }
    if (products.length === 0) {
      actions.loadProducts(CurrentCustomerId());
    }
  }
  render() {
    const { categories } = this.props;
    return (
      <section className="offer-dedicated-body pt-2 pb-2 mt-4 mb-4">
        <Row>
          <Col md={4}>
            <div className="offer-dedicated-body-left">
              <div className="h-100">
                {categories.length !== 0
                  ? categories
                      .filter((x) => x.frm_product_categories_id !== "5")
                      .map((category) => (
                        <ProductCard
                          categoryid={category.frm_product_categories_id}
                          categoryName={category.name}
                          key={category.frm_product_categories_id}
                        />
                      ))
                  : ""}
                {/* <Row>
                  <Col md={3} sm={6} className="mb-4">
                    <BestSeller
                      id="1"
                      title="Deneme"
                      product="Deneme"
                      subTitle="Deneme"
                      imageAlt="Product"
                      image="http://206.189.55.20:8080/preview/276ce05d-837b-4aa1-8f6f-ff02597a0e01/sf/x_file?_fai=58"
                      imageClass="img-fluid item-img"
                      price="5"
                      priceUnit="TL"
                      isNew={true}
                      showPromoted={false}
                      promotedVariant="dark"
                      rating="3.1 (300+)"
                      getValue={this.getQty}
                    />
                  </Col>
                </Row> */}
              </div>
            </div>
          </Col>
        </Row>
      </section>
    );
  }
}
function mapStateToProps(state) {
  return {
    categories: state.categoryReducer,
    products: state.productReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCategories: bindActionCreators(
        productActions.loadCategoriesRequest,
        dispatch
      ),
      loadProducts: bindActionCreators(
        productActions.loadProductsRequest,
        dispatch
      ),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Kios);
