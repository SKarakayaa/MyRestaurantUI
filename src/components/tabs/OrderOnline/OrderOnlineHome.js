import { Button, Form, InputGroup } from "react-bootstrap";
import React, { Component } from "react";

import { Fragment } from "react";
import Icofont from "react-icofont";
import ItemsCarousel from "../../common/ItemsCarousel";
import ProductCard from "./ProductCard";
import ProductLine from "./ProductLine";
import { connect } from "react-redux";

class OrderOnlineHome extends Component {
  BigListCategories = () => {
    const { categories } = this.props;
    const bigListCategories = categories.filter(
      (c) => c.list_type === "1" && c.frm_product_categories_id !== "5"
    );
    return bigListCategories;
  };
  LineListCategories = () => {
    const { categories } = this.props;
    const lineListCategories = categories.filter(
      (c) => c.list_type === "2" && c.frm_product_categories_id !== "5"
    );
    return lineListCategories;
  };
  render() {
    const bigListCategories = this.BigListCategories();
    const lineListCategories = this.LineListCategories();
    console.log("bg :", bigListCategories);
    return (
      <Fragment>
        <h5 className="mb-4">Recommended</h5>
        <Form className="explore-outlets-search mb-4">
          <InputGroup>
            <Form.Control type="text" placeholder="Search for dishes..." />
            <InputGroup.Append>
              <Button type="button" variant="link">
                <Icofont icon="search" />
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
        <h6 className="mb-3">Menus </h6>
        <ItemsCarousel />
        {bigListCategories &&
          bigListCategories.map((bigListCategory) => (
            <ProductCard
              categoryid={bigListCategory.frm_product_categories_id}
              categoryName={bigListCategory.name}
              key={bigListCategory.frm_product_categories_id}
            />
          ))}
        {lineListCategories &&
          lineListCategories.map((lineListCategory) => (
            <ProductLine
              categoryid={lineListCategory.frm_product_categories_id}
              categoryName={lineListCategory.name}
              key={lineListCategory.frm_product_categories_id}
            />
          ))}
      </Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    categories: state.categoryReducer,
  };
}
export default connect(mapStateToProps)(OrderOnlineHome);
