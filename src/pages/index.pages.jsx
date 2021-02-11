import { Col, Container, Row } from "react-bootstrap";

import FontAwesome from "../components/common/fontawesome.component";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel3";
import React from "react";
import TopSearch from "../components/index/top-search.component";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { fetchCuisinesStartAsync } from "../redux/main/main.actions";
import { selectAreCuisiniesFetching } from "../redux/main/main.reselect";
class Index extends React.Component {
  componentDidMount() {
    const { loadCuisines } = this.props;
    loadCuisines();
  }
  render() {
    const { areCuisinesFetching } = this.props;
    return (
      <>
        {!areCuisinesFetching && <TopSearch />}

        {/* {!areCuisinesFetching && <Cuisines />} */}

        <section className="section pt-5 pb-5 products-section">
          <Container>
            {/* <SectionHeading
              heading="Popular Brands"
              subHeading="Top restaurants, cafes, pubs, and bars in Ludhiana, based on trends"
            /> */}
            <Row>
              <Col md={12}>
                <OwlCarousel
                  nav
                  loop
                  {...options}
                  className="owl-carousel-four owl-theme"
                >
                  {/* {this.props.products.map((product) => (
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
                  ))} */}
                </OwlCarousel>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section pt-5 pb-5 bg-white becomemember-section border-bottom">
          <Container>
            {/* <SectionHeading
              heading="Become a Member"
              subHeading="Lorem Ipsum is simply dummy text of"
            /> */}
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
const mapStateToProps = createStructuredSelector({
  areCuisinesFetching: selectAreCuisiniesFetching,
});
const mapDispatchToProps = (dispatch) => ({
  loadCuisines: () => dispatch(fetchCuisinesStartAsync()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Index);
