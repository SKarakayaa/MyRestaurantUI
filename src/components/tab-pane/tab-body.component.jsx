import {
  selectAreFetchingProductMaterials,
  selectAreFethingProducts,
} from "../../redux/product/product.reselect";

import GalleryList from "../gallery/gallery-list.component";
import OrderOnline from "../order-online/order-online.component";
import React from "react";
import RestaurantInfo from "../restaurant-info/restaurant-info.component";
import { Tab } from "react-bootstrap";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCategoriesAreFething } from "../../redux/category/category.reselect";

const TabBody = ({
  areCategoriesFetching,
  areProductMaterialsFetching,
  areProductsFething,
}) => (
  <div className="offer-dedicated-body-left">
    <Tab.Content className="h-100">
      <Tab.Pane eventKey="first">
        {!areCategoriesFetching &&
          !areProductsFething &&
          !areProductMaterialsFetching && <OrderOnline />}
      </Tab.Pane>

      <Tab.Pane eventKey="second">
        <div className="position-relative">
          <GalleryList />
        </div>
      </Tab.Pane>

      <Tab.Pane eventKey="third">
        <RestaurantInfo />
      </Tab.Pane>

      <Tab.Pane eventKey="fourth">{/* <BookTable /> */}</Tab.Pane>

      <Tab.Pane eventKey="fifth">{/* <RatingReviews /> */}</Tab.Pane>
    </Tab.Content>
  </div>
);
const mapStateToProps = createStructuredSelector({
  areCategoriesFetching: selectCategoriesAreFething,
  areProductMaterialsFetching: selectAreFetchingProductMaterials,
  areProductsFething: selectAreFethingProducts,
});
export default connect(mapStateToProps)(TabBody);
