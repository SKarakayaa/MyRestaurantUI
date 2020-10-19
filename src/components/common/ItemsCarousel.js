import React from "react";
import OwlCarousel from "react-owl-carousel3";
import { connect } from "react-redux";
import MayLikeItem from "./MayLikeItem";
import * as productActions from "../../redux/actions/productActions";
import { bindActionCreators } from "redux";

class ItemsCarousel extends React.Component {
  componentDidMount() {
    if (this.props.menus.length === 0) {
      this.props.actions.getProductMenus(1);
    }
  }
  render() {
    const { menus } = this.props;
    console.log("menus :",menus);
    debugger;
    return (
      <OwlCarousel
        nav
        loop
        {...options}
        className="owl-theme owl-carousel-five offers-interested-carousel"
      >
        {menus.map((menu) => (
            <div className="item" key={menu.frm_menus_id}>
              <MayLikeItem
                title={menu.name}
                price={menu.price}
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
    menus: state.productMenusReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProductMenus: bindActionCreators(
        productActions.getProductMenus,
        dispatch
      ),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ItemsCarousel);
