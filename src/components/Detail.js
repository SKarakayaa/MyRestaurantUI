import * as cartActions from "../redux/actions/cartActions";
import * as customerActions from "../redux/actions/customerActions";
import * as customerStatus from "../enums/CustomerStatusEnums";
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
import Closed from "./Closed";
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
    const {match} = this.props;
    var isThereId = Object.keys(match.params).length === 0;
    this.props.actions.loadCurrentUser();
    if (this.props.products.length === 0) {
      this.props.actions.loadProducts(isThereId ? CurrentCustomerId() : match.params.id);
    }
    if (this.props.customerInfo.length === undefined) {
      this.props.actions.loadCustomerInfo(isThereId ? CurrentCustomerId() : match.params.id);
    }
    if (this.props.customerMoreInfo.length === 0) {
      this.props.actions.loadCustomerMoreInfo(isThereId ? CurrentCustomerId() : match.params.id);
    }
    if (this.props.categories.length === 0) {
      this.props.actions.loadCategories(isThereId ? CurrentCustomerId() : match.params.id);
    }
    if (this.props.menus.length === 0) {
      this.props.actions.loadMenus(isThereId ? CurrentCustomerId() : match.params.id);
    }
    if (IsLogin() && this.props.favoriteProducts.length === 0) {
      this.props.actions.loadFavoriteProducts(isThereId ? CurrentCustomerId() : match.params.id);
    }
    if (this.props.customerSlider.length === 0) {
      this.props.actions.loadCustomerSlider(isThereId ? CurrentCustomerId() : match.params.id);
    }
    // if (this.props.customerCuisines.length === 0) {
    //   this.props.actions.loadCustomerCuisines(isThereId ? CurrentCustomerId() : match.params.id);
    // }
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      showAddressModal: false,
    };
  }
  //reselect
  GetCustomerCuisine = () => {
    const { customerCuisines } = this.props;
    let cuisines = " ";
    customerCuisines &&
      customerCuisines.forEach((cuisine) => {
        cuisines += cuisine.name + ", ";
      });
    cuisines = cuisines.slice(0, -2);
    return cuisines;
  };
  //reselect
  CalculateAvaragePoint = () => {
    const { customerComments } = this.props;
    let totalPoint = 0;
    let avg = 0;
    customerComments.forEach((comment) => {
      totalPoint += parseInt(comment.flavor);
    });
    avg = totalPoint / customerComments.length;
    return avg.toFixed(2);
  };
  //reselect
  CalculateTotalRate = () => {
    return this.props.customerComments.length;
  };
  hideAddressModal = () => this.setState({ showAddressModal: false });
  render() {
    const { customerInfo, customerSlider } = this.props;
    console.log("customer info :", customerInfo);
    let totalRate = this.CalculateTotalRate();
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
                      src={
                        customerInfo.sub_logo !== ""
                          ? `http://206.189.55.20:8080/preview/276ce05d-837b-4aa1-8f6f-ff02597a0e01/sf/x_file?_fai=${customerSlider.sub_logo}`
                          : "/img/1.jpg"
                      }
                    />
                    <h2 className="text-white">{customerInfo.name}</h2>
                    <p className="text-white mb-1">
                      <Icofont icon="location-pin" />{" "}
                      {customerInfo.customer_location}
                      {customerInfo.customer_status === customerStatus.OPEN ? (
                        <Badge variant="success">OPEN</Badge>
                      ) : (
                        <Badge variant="danger">CLOSE</Badge>
                      )}
                    </p>
                    <p className="text-white mb-0">
                      <Icofont icon="food-cart" />
                      {this.GetCustomerCuisine()}
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
                        <Icofont icon="star" /> {this.CalculateAvaragePoint()}
                      </span>{" "}
                      {totalRate} Ratings
                      <Icofont icon="speech-comments" className="ml-3" />{" "}
                      {totalRate} reviews
                    </h6>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </section>
        {customerInfo.customer_status === customerStatus.OPEN ? (
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
                      {customerInfo.is_rezervation === true && IsLogin() ? (
                        <Nav.Item>
                          <Nav.Link eventKey="fourth">Rezervation</Nav.Link>
                        </Nav.Item>
                      ) : null}
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
        ) : (
          <Closed />
        )}
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
    customerCuisines: state.customerCuisineReducer,
    customerComments: state.customerCommentReducer,
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
      // loadCustomerCuisines: bindActionCreators(
      //   customerActions.loadCustomerCuisinesRequest,
      //   dispatch
      // ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
