import * as cartActions from "../redux/actions/cartActions";
import * as customerActions from "../redux/actions/customerActions";
import * as productActions from "../redux/actions/productActions";

import {
  Badge,
  Button,
  Col,
  Container,
  Image,
  Nav,
  Row,
  Tab,
} from "react-bootstrap";

import BookTable from "./tabs/BookTable/BookTable";
import GalleryCarousel from "./common/GalleryCarousel";
import Icofont from "react-icofont";
import OrderOnlineHome from "./tabs/OrderOnline/OrderOnlineHome";
import RatingReviews from "./tabs/RatingReviews/RatingReviews";
import React from "react";
import RestaurantInfo from "./tabs/RestaurantInfo/RestaurantInfo";
import YourOrder from "./cart/YourOrder";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Detail extends React.Component {
  componentDidMount() {
    if (this.props.products.length === 0) {
      this.props.actions.getProducts(1);
    }
    if (this.props.customerInfo.length === undefined) {
      this.props.actions.getCustomerInfo(1);
    }
    if (this.props.customerMoreInfo.length === 0) {
      this.props.actions.getCustomerMoreInfo(1);
    }
    if (this.props.categories.length === 0) {
      this.props.actions.getProductCategoriesList(1);
    }
    if (this.props.menus.length === 0) {
      this.props.actions.loadMenus(1);
    }
  }
  constructor(props, context) {
    super(props, context);

    this.state = {
      showAddressModal: false,
    };
  }

  hideAddressModal = () => this.setState({ showAddressModal: false });

  render() {
    const { customerInfo, cart } = this.props;
    console.log("cart :", cart);
    return (
      <>
        <section className="restaurant-detailed-banner">
          <div className="text-center">
            <Image
              fluid
              className="cover"
              src="/img/mall-dedicated-banner.png"
            />
          </div>
          <div className="restaurant-detailed-header">
            <Container>
              <Row className="d-flex align-items-end">
                <Col md={8}>
                  <div className="restaurant-detailed-header-left">
                    <Image
                      fluid
                      className="mr-3 float-left"
                      alt="osahan"
                      src="/img/1.jpg"
                    />
                    <h2 className="text-white">{customerInfo.name}</h2>
                    <p className="text-white mb-1">
                      <Icofont icon="location-pin" />{" "}
                      {customerInfo.customer_location}
                      10029 <Badge variant="success">OPEN</Badge>
                    </p>
                    <p className="text-white mb-0">
                      <Icofont icon="food-cart" /> North Indian, Chinese, Fast
                      Food, South Indian
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="restaurant-detailed-header-right text-right">
                    <Button variant="success" type="button">
                      <Icofont icon="clock-time" /> 25–35 min
                    </Button>
                    <h6 className="text-white mb-0 restaurant-detailed-ratings">
                      <span className="generator-bg rounded text-white">
                        <Icofont icon="star" /> 3.1
                      </span>{" "}
                      23 Ratings
                      <Icofont icon="speech-comments" className="ml-3" /> 91
                      reviews
                    </h6>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </section>

        <Tab.Container defaultActiveKey="first">
          <section className="offer-dedicated-nav bg-white border-top-0 shadow-sm">
            <Container>
              <Row>
                <Col md={12}>
                  <span className="restaurant-detailed-action-btn float-right">
                    <Button
                      variant="light"
                      size="sm"
                      className="border-light-btn mr-1"
                      type="button"
                    >
                      <Icofont icon="heart" className="text-danger" /> Mark as
                      Favourite
                    </Button>
                    <Button
                      variant="light"
                      size="sm"
                      className="border-light-btn mr-1"
                      type="button"
                    >
                      <Icofont icon="cauli-flower" className="text-success" />{" "}
                      Pure Veg
                    </Button>
                  </span>
                  <Nav id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Order Online</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Gallery</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Restaurant Info</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="fourth">Book A Table</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="fifth">Ratings & Reviews</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="offer-dedicated-body pt-2 pb-2 mt-4 mb-4">
            <Container>
              <Row>
                <Col md={8}>
                  <div className="offer-dedicated-body-left">
                    <Tab.Content className="h-100">
                      <Tab.Pane eventKey="first">
                        <OrderOnlineHome />
                      </Tab.Pane>

                      <Tab.Pane eventKey="second">
                        <div className="position-relative">
                          <GalleryCarousel />
                        </div>
                      </Tab.Pane>

                      <Tab.Pane eventKey="third">
                        <RestaurantInfo />
                      </Tab.Pane>

                      <Tab.Pane eventKey="fourth">
                        <BookTable />
                      </Tab.Pane>

                      <Tab.Pane eventKey="fifth">
                        <RatingReviews />
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </Col>
                <Col md={4}>
                  <YourOrder />
                </Col>
              </Row>
            </Container>
          </section>
        </Tab.Container>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.productReducer,
    mostPopularProducts: state.productReducer,
    customerInfo: state.customerInfoReducer,
    customerMoreInfo: state.customerMoreInfoReducer,
    categories: state.categoryReducer,
    cart: state.cartReducer,
    menus: state.menuReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
      getMostPopularProducts: bindActionCreators(
        productActions.getMostPopularProducts,
        dispatch
      ),
      getCustomerInfo: bindActionCreators(
        customerActions.getCustomerInfo,
        dispatch
      ),
      getCustomerMoreInfo: bindActionCreators(
        customerActions.getCustomerMoreInfo,
        dispatch
      ),
      getProductCategoriesList: bindActionCreators(
        productActions.getProductCategoriesList,
        dispatch
      ),
      loadMenus: bindActionCreators(productActions.getMenus, dispatch),
      addToCart: bindActionCreators(cartActions.addToCart, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
