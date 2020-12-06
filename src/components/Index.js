import * as productActions from "../redux/actions/productActions";

import { Col, Container, Row } from "react-bootstrap";

import CardItem from "./common/CardItem";
import { CurrentCustomerId } from "./Helper";
import FontAwesome from "./common/FontAwesome";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel3";
import ProductBox from "./home/ProductBox";
import React from "react";
import SectionHeading from "./common/SectionHeading";
import TopSearch from "./home/TopSearch";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Index extends React.Component {
  componentDidMount() {
    if (this.props.products.length === 0) {
      this.props.actions.getProducts(CurrentCustomerId());
    }
  }
  render() {
    return (
      <>
        <TopSearch />
        <section className="section pt-5 pb-5 bg-white homepage-add-section">
          <Container>
            <Row>
              <Col md={3} xs={6}>
                <ProductBox
                  image="img/pro1.jpg"
                  imageClass="img-fluid rounded"
                  imageAlt="product"
                  linkUrl="#"
                />
              </Col>
              <Col md={3} xs={6}>
                <ProductBox
                  image="img/2.jpg"
                  imageClass="img-fluid rounded"
                  imageAlt="product"
                  linkUrl="#"
                />
              </Col>
              <Col md={3} xs={6}>
                <ProductBox
                  image="img/pro3.jpg"
                  imageClass="img-fluid rounded"
                  imageAlt="product"
                  linkUrl="#"
                />
              </Col>
              <Col md={3} xs={6}>
                <ProductBox
                  image="img/pro4.jpg"
                  imageClass="img-fluid rounded"
                  imageAlt="product"
                  linkUrl="#"
                />
              </Col>
            </Row>
          </Container>
        </section>

        <section className="section pt-5 pb-5 products-section">
          <Container>
            <SectionHeading
              heading="Popular Brands"
              subHeading="Top restaurants, cafes, pubs, and bars in Ludhiana, based on trends"
            />
            <Row>
              <Col md={12}>
                <OwlCarousel
                  nav
                  loop
                  {...options}
                  className="owl-carousel-four owl-theme"
                >
                  {this.props.products.map((product) => (
                    <div className="item" key={product.id}>
                      <CardItem
                        id={product.id}
                        title={product.name}
                        subTitle="North Indian • American • Pure veg"
                        imageAlt="Product"
                        image="img/list/1.png"
                        imageClass="img-fluid item-img"
                        linkUrl="detail"
                        offerText="65% off | Use Coupon OSAHAN50"
                        time="20–25 min"
                        price={product.price}
                        showPromoted={true}
                        promotedVariant="dark"
                        favIcoIconColor="text-danger"
                        rating="3.1 (300+)"
                      />
                    </div>
                  ))}
                </OwlCarousel>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section pt-5 pb-5 bg-white becomemember-section border-bottom">
          <Container>
            <SectionHeading
              heading="Become a Member"
              subHeading="Lorem Ipsum is simply dummy text of"
            />
            <Row>
              <Col sm={12} className="text-center">
                <Link to="register" className="btn btn-success btn-lg">
                  Create an Account <FontAwesome icon="chevron-circle-right" />
                </Link>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}

const options = {
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 4,
    },
    1200: {
      items: 4,
    },
  },

  lazyLoad: true,
  pagination: false.toString(),
  loop: true,
  dots: false,
  autoPlay: 2000,
  nav: true,
  navText: [
    "<i class='fa fa-chevron-left'></i>",
    "<i class='fa fa-chevron-right'></i>",
  ],
};

function mapStateToProps(state) {
  return {
    products: state.productReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);
