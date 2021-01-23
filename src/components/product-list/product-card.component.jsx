import ProductCardItem from "./product-card-item.component";
import React from "react";
import { Row } from "react-bootstrap";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectProducts } from "../../redux/product/product.reselect";

const ProductCard = ({ category, products, currencyUnit }) => (
  <Row>
    <h5 className="mb-4 mt-3 col-md-12">{category.name}</h5>
    {products
      .filter(
        (product) =>
          product.product_category_id === category.frm_product_categories_id
      )
      .map((product) => (
        <ProductCardItem
          currencyUnit={currencyUnit}
          product={product}
          isFavorite={false}
          key={product.frm_product_id}
        />
      ))}
  </Row>
);
const mapStateToProps = createStructuredSelector({
  products: selectProducts,
});
export default connect(mapStateToProps)(ProductCard);
