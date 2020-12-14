import * as cartActions from "../redux/actions/cartActions";
import * as customerActions from "../redux/actions/customerActions";
import * as productActions from "../redux/actions/productActions";
import * as userActions from "../redux/actions/userActions";

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
import IsLogin, { CurrentCustomerId } from "./Helper";

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
    this.props.actions.loadCurrentUser();
    if (this.props.products.length === 0) {
      this.props.actions.loadProducts(CurrentCustomerId());
    }
    if (this.props.customerInfo.length === undefined) {
      this.props.actions.loadCustomerInfo(CurrentCustomerId());
    }
    if (this.props.customerMoreInfo.length === 0) {
      this.props.actions.loadCustomerMoreInfo(CurrentCustomerId());
    }
    if (this.props.categories.length === 0) {
      this.props.actions.loadCategories(CurrentCustomerId());
    }
    if (this.props.menus.length === 0) {
      this.props.actions.loadMenus(CurrentCustomerId());
    }
    if (IsLogin() && this.props.favoriteProducts.length === 0) {
      this.props.actions.loadFavoriteProducts(CurrentCustomerId());
    }
    if (this.props.customerSlider.length === 0) {
      this.props.actions.loadCustomerSlider(CurrentCustomerId());
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
    const { customerInfo, customerSlider } = this.props;
    return (
      <>
        <section className="restaurant-detailed-banner">
          <div className="text-center">
            <Image
              fluid
              className="cover"
              src={
                customerSlider !== undefined && customerSlider.length !== 0
                  ? `http://206.189.55.20:8080/preview/276ce05d-837b-4aa1-8f6f-ff02597a0e01/sf/x_file?_fai=${customerSlider.photo_path}`
                  : "/img/mall-dedicated-banner.png"
              }
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
                      {customerInfo.customer_status === "1" ? (
                        <Badge variant="success">OPEN</Badge>
                      ) : (
                        <Badge variant="danger">CLOSE</Badge>
                      )}
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
                        login
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
    currentUser: state.currentUserReducer,
    favoriteProducts: state.favoriteProductReducer,
    customerSlider: state.customerSliderReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadProducts: bindActionCreators(
        productActions.loadProductsRequest,
        dispatch
      ),
      loadCustomerInfo: bindActionCreators(
        customerActions.loadCustomerInfoRequest,
        dispatch
      ),
      loadCustomerMoreInfo: bindActionCreators(
        customerActions.loadCustomerMoreInfoRequest,
        dispatch
      ),
      loadCategories: bindActionCreators(
        productActions.loadCategoriesRequest,
        dispatch
      ),
      loadMenus: bindActionCreators(productActions.loadMenusRequest, dispatch),
      addToCart: bindActionCreators(cartActions.addToCart, dispatch),
      loadFavoriteProducts: bindActionCreators(
        userActions.loadFavoritesRequest,
        dispatch
      ),
      loadCurrentUser: bindActionCreators(userActions.getCurrentUser, dispatch),
      loadCustomerSlider: bindActionCreators(
        customerActions.loadCustomerSliderRequest,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
