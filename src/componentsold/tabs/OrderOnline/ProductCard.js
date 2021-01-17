import { Col, Row } from "react-bootstrap";
import React, { Component } from "react";

import BestSeller from "../../common/BestSeller";
import { connect } from "react-redux";

//make functional comp
class ProductCard extends Component {
  render() {
    const { products, categoryid, categoryName,customerInfo } = this.props;
    return (
      <Row>
        <h5 className="mb-4 mt-3 col-md-12">{categoryName} </h5>
        {products
          .filter((p) => p.product_category_id === categoryid)
          .map((product) =>
            product.is_menu === false ? (
              <Col md={4} sm={6} className="mb-4" key={product.frm_product_id}>
                {/* Send just product */}
                <BestSeller
                  id={product.frm_product_id}
                  title={product.name}
                  product={product}
                  subTitle={product.description}
                  imageAlt="Product"
                  image={`http://206.189.55.20:8080/preview/276ce05d-837b-4aa1-8f6f-ff02597a0e01/sf/x_file?_fai=${product.photo}`}
                  imageClass="img-fluid item-img"
                  price={product.price}
                  priceUnit={customerInfo.currency_unit}
                  isNew={product.is_new}
                  showPromoted={false}
                  promotedVariant="dark"
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
    customerInfo:state.customerInfoReducer
  };
}
export default connect(mapStateToProps)(ProductCard);
