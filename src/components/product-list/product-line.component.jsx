import { Col, Row } from "react-bootstrap";

import ProductLineItem from "./product-line-item.component";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectProducts } from "../../redux/product/product.reselect";

const ProductLine = ({ category, products,currencyUnit }) => (
  <Row>
    <h5 className="mb-4 mt-3 col-md-12">{category.name}</h5>
    <Col md={12}>
      <div className="bg-white rounded borded shadow-sm mb-4">
        {products
          .filter(
            (product) =>
              product.product_category_id === category.frm_product_categories_id
          )
          .map((product) => (
            <ProductLineItem currencyUnit={currencyUnit} product={product} key={product.frm_product_id} />
          ))}
      </div>
    </Col>
  </Row>
);
const mapStateToProps = createStructuredSelector({
  products: selectProducts,
});
export default connect(mapStateToProps)(ProductLine);
