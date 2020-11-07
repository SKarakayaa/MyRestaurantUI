import { Col, Row } from "react-bootstrap";
import React, { Component } from "react";

import { Fragment } from "react";
import QuickBite from "../../common/QuickBite";
import { connect } from "react-redux";

class ProductLine extends Component {
  render() {
    const { categories, products } = this.props;
    return (
      <Fragment>
        {categories.map((category) => (
          <Row key={category.frm_product_categories_id}>
            <h5 className="mb-4 mt-3 col-md-12">{category.name} </h5>
            <Col md={12}>
              <div className="bg-white rounded border shadow-sm mb-4">
                {products
                  .filter(
                    (product) =>
                      product.product_category_id ===
                      category.frm_product_categories_id
                  )
                  .map((product) =>
                    product.is_menu === false ? (
                      <QuickBite
                        key={product.frm_product_id}
                        id={product.frm_product_id}
                        title={product.name}
                        price={product.price}
                        product={product}
                        priceUnit="£"
                        getValue={this.getQty}
                      />
                    ) : (
                      ""
                    )
                  )}
              </div>
            </Col>
          </Row>
        ))}
      </Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    categories: state.categoryReducer,
    products: state.productReducer,
  };
}
export default connect(mapStateToProps)(ProductLine);