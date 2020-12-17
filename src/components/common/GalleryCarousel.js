import * as customerActions from "../../redux/actions/customerActions";

import { CurrentCustomerId } from "../Helper";
import { Image } from "react-bootstrap";
import OwlCarousel from "react-owl-carousel3";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class GalleryCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemscount: 0,
      showing: 0,
    };
    this.Carousel = React.createRef();
  }
  componentDidMount() {
    if (this.props.customerGalery.length === 0) {
      this.props.actions.loadCustomerGalery(CurrentCustomerId());
    }
  }
  render() {
    const { customerGalery } = this.props;
    return (
      <>
        <OwlCarousel
          ref={this.Carousel}
          nav
          loop
          {...options}
          className="owl-theme"
        >
          {customerGalery &&
            customerGalery.map((galery) => (
              <div className="item" key={galery.frm_customer_galery_id}>
                <Image
                  fluid
                  src={`http://206.189.55.20:8080/preview/276ce05d-837b-4aa1-8f6f-ff02597a0e01/sf/x_file?_fai=${galery.path}`}
                />
              </div>
            ))}
        </OwlCarousel>
        <div className="position-absolute restaurant-slider-pics bg-dark text-white">
          1 of {customerGalery.length} Photos
        </div>
        {/* <div className="position-absolute restaurant-slider-view-all"><Button variant='light' type="button" className="bg-white">See all Photos</Button></div> */}
      </>
    );
  }
}

const options = {
  responsive: {
    0: {
      items: 2,
    },
    764: {
      items: 2,
    },
    765: {
      items: 1,
    },
    1200: {
      items: 1,
    },
  },
  lazyLoad: true,
  loop: true,
  autoplay: true,
  autoplaySpeed: 1000,
  dots: false,
  autoplayTimeout: 2000,
  nav: true,
  navText: [
    "<i class='fa fa-chevron-left'></i>",
    "<i class='fa fa-chevron-right'></i>",
  ],
  autoplayHoverPause: false,
};
function mapStateToProps(state) {
  return {
    customerGalery: state.customerGaleryReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCustomerGalery: bindActionCreators(
        customerActions.loadCustomerGaleryRequest,
        dispatch
      ),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(GalleryCarousel);
