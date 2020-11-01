import MayLikeItem from "./MayLikeItem";
import OwlCarousel from "react-owl-carousel3";
import React from "react";
import { connect } from "react-redux";

class ItemsCarousel extends React.Component {
  render() {
    const { menus } = this.props;
    return (
      <OwlCarousel
        nav
        loop
        {...options}
        className="owl-theme owl-carousel-five offers-interested-carousel"
      >
        {menus.map((menu) => (
          <div className="item" key={menu.frm_product_id}>
            <MayLikeItem
              title={menu.name}
              price={menu.price + " £"}
              menu={menu}
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
      items: 0,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 2,
    },
    1200: {
      items: 3,
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
function mapStateToProps(state) {
  return {
    menus: state.menuReducer,
  };
}
export default connect(mapStateToProps)(ItemsCarousel);
