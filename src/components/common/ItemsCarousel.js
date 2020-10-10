import React from "react";
import OwlCarousel from "react-owl-carousel3";
import MayLikeItem from "./MayLikeItem";

class ItemsCarousel extends React.Component {
  render() {
    const { mostPopularProducts } = this.props;
    return (
      <OwlCarousel
        nav
        loop
        {...options}
        className="owl-theme owl-carousel-five offers-interested-carousel"
      >
        {mostPopularProducts.map((mostPopularProduct) => (
          <div className="item" key={mostPopularProduct.frm_product_id}>
            <MayLikeItem
              title={mostPopularProduct.name}
              price={mostPopularProduct.price}
              image="img/list/1.png"
              imageClass="img-fluid"
              imageAlt="carousel"
            />
          </div>
        ))}
      </OwlCarousel>
    );
  }
}

const options = {
  responsive: {
    0: {
      items: 2,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 4,
    },
    1200: {
      items: 5,
    },
  },
  lazyLoad: true,
  pagination: "false",
  loop: true,
  dots: false,
  autoPlay: 2000,
  nav: true,
  navText: [
    "<i class='icofont-thin-left'></i>",
    "<i class='icofont-thin-right'></i>",
  ],
};

export default ItemsCarousel;
