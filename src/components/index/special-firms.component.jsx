import { Col, Container, Row } from "react-bootstrap";

import React from "react";
import SpecialFirmsItem from "./special-firms-item.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCustomers } from "../../redux/main/main.reselect";

const SpecialFirms = ({ customers }) => (
  <section className="section pt-5 pb-5 bg-white homepage-add-section">
    <Container>
      <Row>
        {customers.map((customer) => (
          <Col md={3} xs={6}>
            <SpecialFirmsItem customer={customer} />
          </Col>
        ))}
      </Row>
    </Container>
  </section>
);
const mapStateToProps = createStructuredSelector({
  customers: selectCustomers,
});
export default connect(mapStateToProps)(SpecialFirms);
