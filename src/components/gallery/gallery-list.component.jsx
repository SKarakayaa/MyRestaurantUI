import {
  selectCustomerGallery,
  selectCustomerGalleryIsFetching,
} from "../../redux/customer/customer.reselect";

import { CurrentCustomerId } from "../../componentsold/Helper";
import { Image } from "react-bootstrap";
import OwlCarousel from "react-owl-carousel3";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchCustomerGalleryStartAsync } from "../../redux/customer/customer.actions";
import { options } from "../../helpers/owlCarouselOptions";

class GalleryList extends React.Component {
  componentDidMount() {
    const { loadCustomerGallery } = this.props;
    loadCustomerGallery(CurrentCustomerId());
  }
  render() {
    const { isGalleryFetching, gallery } = this.props;
    console.log("gallery :", gallery);
    return (
      !isGalleryFetching && (
        <>
          <OwlCarousel
            ref={this.Carousel}
            nav
            loop
            {...options}
            className="owl-theme"
          >
            {gallery.map((galleryItem) => (
              <div className="item" key={galleryItem.frm_customer_galery_id}>
                <Image
                  fluid
                  src={`http://206.189.55.20:8080/preview/276ce05d-837b-4aa1-8f6f-ff02597a0e01/sf/x_file?_fai=${galleryItem.path}`}
                />
              </div>
            ))}
          </OwlCarousel>
          <div className="position-absolute restaurant-slider-pics bg-dark text-white">
            1 of {gallery.length} Photos
          </div>
          {/* <div className="position-absolute restaurant-slider-view-all"><Button variant='light' type="button" className="bg-white">See all Photos</Button></div> */}
        </>
      )
    );
  }
}
const mapStateToProps = createStructuredSelector({
  isGalleryFetching: selectCustomerGalleryIsFetching,
  gallery: selectCustomerGallery,
});
const mapDispatchToProps = (dispatch) => ({
  loadCustomerGallery: (customerid) =>
    dispatch(fetchCustomerGalleryStartAsync(customerid)),
});
export default connect(mapStateToProps, mapDispatchToProps)(GalleryList);
