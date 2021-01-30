import { Col, Nav, Row } from "react-bootstrap";

import AuthHelper from "../../helpers/authHelper";
import React from "react";

const TabHeader = () => (
  <Row>
    <Col md={12}>
      <Nav id="pills-tab">
        <Nav.Item>
          <Nav.Link eventKey="first">Order Online</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="second">Gallery</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="third">Restaurant Info</Nav.Link>
        </Nav.Item>
        {AuthHelper.IsLogin() && (
          <Nav.Item>
            <Nav.Link eventKey="fourth">Rezervation</Nav.Link>
          </Nav.Item>
        )}
        <Nav.Item>
          <Nav.Link eventKey="fifth">Ratings & Reviews</Nav.Link>
        </Nav.Item>
      </Nav>
    </Col>
  </Row>
);
export default TabHeader;
