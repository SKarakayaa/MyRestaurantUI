import { Col, Container, Row } from "react-bootstrap";

import OwlCarousel from "react-owl-carousel3";
import PopularFirmsItem from "./popular-firms-item.component";
import React from "react";
import SectionHeading from "../common/section-heading.component";
import { TranslatePlaceholder } from "../../utilities/translator-placeholder";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { popularFirmOptions } from "../../helpers/owlCarouselOptions";
import { selectCustomers } from "../../redux/main/main.reselect";

const PopularFirms = ({ customers }) => (
  <section className="section pt-5 pb-5 products-section">
    <Container>
      <SectionHeading
        heading={TranslatePlaceholder("Popular Brands")}
        subHeading={TranslatePlaceholder(
          "Lists of top restaurants and cafes, based on trends"
        )}
      />
      <Row>
        <Col md={12}>
          <OwlCarousel
            nav
            loop
            {...popularFirmOptions}
            className="owl-carousel-four owl-theme"
          >
            {customers &&
              customers
                .filter((customer) => customer.is_popular)
                .map((customer) => (
                  <div className="item" key={customer.frm_customer_id}>
                    <PopularFirmsItem customer={customer} />
                  </div>
                ))}
          </OwlCarousel>
        </Col>
      </Row>
    </Container>
  </section>
);

const mapStateToProps = createStructuredSelector({
  customers: selectCustomers,
});
export default connect(mapStateToProps)(PopularFirms);
