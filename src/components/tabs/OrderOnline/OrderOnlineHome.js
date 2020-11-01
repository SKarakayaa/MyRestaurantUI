import { Button, Form, InputGroup } from "react-bootstrap";
import React, { Component } from "react";

import { Fragment } from "react";
import Icofont from "react-icofont";
import ItemsCarousel from "../../common/ItemsCarousel";
import ProductCard from "./ProductCard";
import ProductLine from './ProductLine';
import { connect } from "react-redux";

class OrderOnlineHome extends Component {
  render() {
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

        <ProductCard />

        <ProductLine />
        
      </Fragment>
    );
  }
}

export default connect()(OrderOnlineHome);
