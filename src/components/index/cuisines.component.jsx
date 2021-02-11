import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCuisinies } from "../../redux/main/main.reselect";
import CuisineItem from "./cuisine-item.component";
import OwlCarousel from "react-owl-carousel3";

const Cuisines = ({ cuisines }) => (
  <OwlCarousel
    nav
    loop
    {...options}
    className="owl-carousel-category owl-theme"
  >
    {cuisines.map((cuisine) => (
      <CuisineItem title={cuisine.name} />
    ))}
  </OwlCarousel>
);
const mapStateToProps = createStructuredSelector({
  cuisines: selectCuisinies,
});
const options = {
  responsive: {
    0: {
      items: 3,
    },
    600: {
      items: 4,
    },
    1000: {
      items: 6,
    },
    1200: {
      items: 8,
    },
  },
  loop: true,
  lazyLoad: true,
  autoplay: true,
  dots: false,
  autoplaySpeed: 1000,
  autoplayTimeout: 2000,
  autoplayHoverPause: true,
  nav: true,
  navText: [
    "<i class='fa fa-chevron-left'></i>",
    "<i class='fa fa-chevron-right'></i>",
  ],
};

export default connect(mapStateToProps)(Cuisines);
