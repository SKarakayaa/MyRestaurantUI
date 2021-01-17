import { Button, Form, InputGroup } from "react-bootstrap";
import {
  bigListCategories,
  smallListCategories,
} from "../../redux/category/category.reselect";

import { Fragment } from "react";
import Icofont from "react-icofont";
import MenuList from "../menu-list/menu-list.component";
import ProductCard from "../product-list/product-card.component";
import ProductLine from "../product-list/product-line.component";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCustomerInfo } from "../../redux/customer/customer.reselect";

const OrderOnline = ({
  bigListCategories,
  smallListCategories,
  customerInfo,
}) => {
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
      <MenuList currencyUnit={customerInfo.currency_unit} />

      {bigListCategories.map((bigListCategory) => (
        <ProductCard
          category={bigListCategory}
          currencyUnit={customerInfo.currency_unit}
          key={bigListCategory.frm_product_categories_id}
        />
      ))}

      {smallListCategories.map((smallListCategory) => (
        <ProductLine
          category={smallListCategory}
          currencyUnit={customerInfo.currency_unit}
          key={smallListCategory.frm_product_categories_id}
        />
      ))}
    </Fragment>
  );
};
const mapStateToProps = createStructuredSelector({
  bigListCategories: bigListCategories,
  smallListCategories: smallListCategories,
  customerInfo: selectCustomerInfo,
});
export default connect(mapStateToProps)(OrderOnline);
