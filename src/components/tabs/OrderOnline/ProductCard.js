import { Col, Row } from "react-bootstrap";
import React, { Component } from "react";

import BestSeller from "../../common/BestSeller";
import { connect } from "react-redux";

class ProductCard extends Component {
  render() {
    const { products } = this.props;
    return (
      <Row>
        <h5 className="mb-4 mt-3 col-md-12">Products </h5>
        {products.map((product) =>
          product.is_menu === false ? (
            <Col md={4} sm={6} className="mb-4" key={product.frm_product_id}>
              <BestSeller
                id={product.frm_product_id}
                title={product.name}
                product={product}
                subTitle="North Indian • American • Pure veg"
                imageAlt="Product"
                image="img/list/1.png"
                imageClass="img-fluid item-img"
                price={product.price}
                priceUnit="£"
                isNew={true}
                showPromoted={true}
                promotedVariant="dark"
                favIcoIconColor="text-danger"
                rating="3.1 (300+)"
                getValue={this.getQty}
              />
            </Col>
          ) : (
            ""
          )
        )}
      </Row>
    );
  }
}
function mapStateToProps(state) {
  return {
    products: state.productReducer,
  };
}
export default connect(mapStateToProps)(ProductCard);
