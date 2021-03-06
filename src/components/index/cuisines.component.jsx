import CuisineItem from "./cuisine-item.component";
import OwlCarousel from "react-owl-carousel3";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { cuisinesOptions } from "../../helpers/owlCarouselOptions";
import { selectCuisinies } from "../../redux/main/main.reselect";

const Cuisines = ({ cuisines }) => {
  return (
    <OwlCarousel
      nav
      loop
      {...cuisinesOptions}
      className="owl-carousel-category owl-theme"
    >
      {cuisines.map((cuisine, index) => (
        <CuisineItem title={cuisine.name} photo={cuisine.photo} key={index} />
      ))}
    </OwlCarousel>
  );
};
const mapStateToProps = createStructuredSelector({
  cuisines: selectCuisinies,
});

export default connect(mapStateToProps)(Cuisines);
