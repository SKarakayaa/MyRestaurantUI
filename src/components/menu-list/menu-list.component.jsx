import MenuListItem from "./menu-list-item.component";
import OwlCarousel from "react-owl-carousel3";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { options } from "../../helpers/owlCarouselOptions";
import { selectMenus } from "../../redux/product/product.reselect";

const MenuList = ({ menus, currencyUnit }) => (
  <OwlCarousel
    nav
    loop
    {...options}
    className="owl-theme owl-carousel-five offers-interested-carousel"
  >
    {menus.map((menu) => (
      <div className="item" key={menu.frm_product_id}>
        <MenuListItem menu={menu} currencyUnit={currencyUnit} />
      </div>
    ))}
  </OwlCarousel>
);
const mapStateToProps = createStructuredSelector({
  menus: selectMenus,
});
export default connect(mapStateToProps)(MenuList);
